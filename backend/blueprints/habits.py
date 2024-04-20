from flask import Blueprint, request
from database import habits

habits = Blueprint("habits", __name__, url_prefix='/habits')

@habits.route('', methods=['POST'])
def create_habit():
    userID = request.headers.get('Authorization')
    return userID

@habits.route('', methods=['GET'])
def get_all_habits():
    return

@habits.route('/<habitID>', methods=['PUT'])
def update_habit(habitID):
    return

@habits.route('/<habitID>', methods=['DELETE'])
def delete_habit(habitID):
    return
