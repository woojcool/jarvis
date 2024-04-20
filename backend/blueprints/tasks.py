from flask import Blueprint, request
from database import tasks

tasks = Blueprint("tasks", __name__, url_prefix='/tasks')

@tasks.route('/', methods=['POST'])
def create_task():
    return

@tasks.route('/', methods=['GET'])
def get_all_tasks():
    return

@tasks.route('/<taskID>', methods=['PUT'])
def update_task(taskID):
    return

@tasks.route('/<taskID>', methods=['DELETE'])
def delete_task(taskID):
    return
