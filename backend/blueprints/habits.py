from flask import Blueprint, request
from database import users, habits
from bson.objectid import ObjectId

habits_bp = Blueprint("habits", __name__, url_prefix='/habits')

@habits_bp.route('', methods=['POST'])
def create_habit():
    # check user
    userID = request.headers.get('Authorization')
    user = users.find_one({"_id": ObjectId(userID)})
    if not user:
        return {'error': 'User not found'}, 404

    # get habit data
    body = request.get_json(force=True)
    name = body['name']
    scheduled = body['scheduled']

    # insert new habit into db
    new_habit = {
        "_userID": ObjectId(userID),
        "name": name,
        "scheduled": scheduled,
        "completed": [False] * 7
    }
    result = habits.insert_one(new_habit)

    # return habit data
    new_habit = {
        "habitID": str(result.inserted_id),
        "name": name,
        "scheduled": scheduled,
        "completed": [False] * 7
    }
    return new_habit, 201

@habits_bp.route('', methods=['GET'])
def get_all_habits():
    # check user
    userID = request.headers.get('Authorization')
    user = users.find_one({"_id": ObjectId(userID)})
    if not user:
        return {'error': 'User not found'}, 404
    
    # fetch all habits with matching userID
    results = habits.find({"_userID": ObjectId(userID)})

    # return habits
    array = list(map(lambda x: {
        "habitID": str(x['_id']),
        "name": x['name'],
        "scheduled": x['scheduled'],
        "completed": x['completed']
    }, list(results)))
    return {'habits': array}, 200

@habits_bp.route('/<habitID>', methods=['PUT'])
def update_habit(habitID):
    userID = request.headers.get('Authorization')
    user = users.find_one({"_id": ObjectId(userID)})
    if not user:
        return {'error': 'User not found'}, 404

    body = request.get_json(force=True)

    update_data = {key: value for key, value in body.items() if key in ['name', 'scheduled', 'completed']}

    result = habits.update_one({"_id": ObjectId(habitID), "_userID": ObjectId(userID)}, {'$set': update_data})
    if result.matched_count == 0:
        return {'error': 'Habit not found'}, 404


    return update_data, 200
    

@habits_bp.route('/<habitID>', methods=['DELETE'])
def delete_habit(habitID):
    userID = request.headers.get('Authorization')
    user = users.find_one({"_id": ObjectId(userID)})
    if not user:
        return {'error': 'User not found'}, 404
    
    result = habits.delete_one({"_id": ObjectId(habitID), "_userID": ObjectId(userID)})
    if result.deleted_count == 0:
        return {'error': 'Habit not found or already deleted'}, 404

    return {'message': 'Habit deleted'}, 200

