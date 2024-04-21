from flask import Blueprint, request
from database import users, tasks
from bson.objectid import ObjectId

tasks_bp = Blueprint("tasks", __name__, url_prefix='/tasks')


@tasks_bp.route('', methods=['POST'])
def create_task():
    userID = request.headers.get('Authorization')
    user = users.find_one({"_id": ObjectId(userID)})
    if not user:
        return {'error': 'User not found'}, 404

    body = request.get_json(force=True)
    name = body['name']
    deadline = body['deadline']

    new_task = {
        "_userID": ObjectId(userID),
        "name": name,
        "deadline": deadline,
        "completed": False
    }
    result = tasks.insert_one(new_task)
    new_task = {
        "taskID": str(result.inserted_id),
        "name": name,
        "deadline": deadline,
        "completed": False
    }

    return new_task, 201


@tasks_bp.route('', methods=['GET'])
def get_all_tasks():
    userID = request.headers.get('Authorization')
    user = users.find_one({"_id": ObjectId(userID)})
    if not user:
        return {'error': 'User not found'}, 404

    results = tasks.find({"_userID": ObjectId(userID)})
    array = list(map(lambda x: {
        "taskID": str(x['_id']),
        "name": x['name'],
        "deadline": x['deadline'],
        "completed": x['completed']
    }, list(results)))
    return {'tasks': array}, 200


@tasks_bp.route('/<taskID>', methods=['PUT'])
def update_task(taskID):
    userID = request.headers.get('Authorization')
    user = users.find_one({"_id": ObjectId(userID)})
    if not user:
        return {'error': 'User not found'}, 404

    body = request.get_json(force=True)
    update_data = {key: value for key, value in body.items() if key in [
        'name', 'deadline', 'completed']}
    result = tasks.update_one(
        {"_id": ObjectId(taskID), "_userID": ObjectId(userID)}, {'$set': update_data})

    if result.matched_count == 0:
        return {'error': 'Task not found'}, 404

    return update_data, 200


@tasks_bp.route('/<taskID>', methods=['DELETE'])
def delete_task(taskID):
    userID = request.headers.get('Authorization')
    user = users.find_one({"_id": ObjectId(userID)})
    if not user:
        return {'error': 'User not found'}, 404

    result = tasks.delete_one(
        {"_id": ObjectId(taskID), "_userID": ObjectId(userID)})
    if result.deleted_count == 0:
        return {'error': 'Task not found or already deleted'}, 404

    return "", 200
