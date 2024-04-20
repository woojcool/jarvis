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
    userID = request.headers.get('Authorization')
    return

@habits_bp.route('/<habitID>', methods=['PUT'])
def update_habit(habitID):
    userID = request.headers.get('Authorization')
    return

@habits_bp.route('/<habitID>', methods=['DELETE'])
def delete_habit(habitID):
    userID = request.headers.get('Authorization')
    return
