from flask import Blueprint, request
from database import tasks

tasks_bp = Blueprint("tasks", __name__, url_prefix='/tasks')

@tasks_bp.route('/', methods=['POST'])
def create_task():
    return

@tasks_bp.route('/', methods=['GET'])
def get_all_tasks():
    return

@tasks_bp.route('/<taskID>', methods=['PUT'])
def update_task(taskID):
    return

@tasks_bp.route('/<taskID>', methods=['DELETE'])
def delete_task(taskID):
    return
