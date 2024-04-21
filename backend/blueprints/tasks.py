from flask import Blueprint, request
from database import users, tasks
from bson.objectid import ObjectId


tasks_bp = Blueprint("tasks", __name__, url_prefix='/tasks')

@tasks_bp.route('/', methods=['POST'])
def create_task():
    userID = request.headers.get('Authorization')
    user = users.find_one({"_id": ObjectId(userID)})
    if not user:
        return {'error': 'User not found'}, 404

    return

@tasks_bp.route('/', methods=['GET'])
def get_all_tasks():
    userID = request.headers.get('Authorization')
    user = users.find_one({"_id": ObjectId(userID)})
    if not user:
        return {'error': 'User not found'}, 404

    return

@tasks_bp.route('/<taskID>', methods=['PUT'])
def update_task(taskID):
    userID = request.headers.get('Authorization')
    user = users.find_one({"_id": ObjectId(userID)})
    if not user:
        return {'error': 'User not found'}, 404

    return

@tasks_bp.route('/<taskID>', methods=['DELETE'])
def delete_task(taskID):
    userID = request.headers.get('Authorization')
    user = users.find_one({"_id": ObjectId(userID)})
    if not user:
        return {'error': 'User not found'}, 404

    return
