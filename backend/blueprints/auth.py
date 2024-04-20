from flask import Blueprint, request
from database import users

auth = Blueprint("auth", __name__, url_prefix='/auth')

@auth.route('/register', methods=["POST"])
def register():
    body = request.get_json(force=True)
    username = body['username']
    password = body['password']

    if username == '': # maybe some other validity checks too idk
        return {'error': 'Invalid username'}, 400
    
    # TODO: securely insert username/pass into "users" db (imported above)

    if usernameAlreadyExists: # figure out how to check this
        return {'error': 'Username already exists'}, 409

    userID = '6969420' # replace this with inserted_id of user
    return {'userID': userID}, 201

@auth.route('/login', methods=["POST"])
def login():
    body = request.get_json(force=True)
    username = body['username']
    password = body['password']

    # TODO: find username in "users" db

    if usernameWasNotFound: # figure out how to check this
        return {'error': 'Invalid username'}, 404
    
    # TODO: check if provided password matches the stored encrypted password

    if passwordDoesNotMatch: # figure out how to check this
        return {'error': 'Incorrect password'}, 401

    userID = '6969420' # replace this with id of user
    return {'userID': userID}, 200

@auth.route('/delete', methods=["DELETE"])
def delete():
    body = request.get_json(force=True)
    username = body['username']
    password = body['password']
    
    # TODO: find username in "users" db

    if usernameWasNotFound: # figure out how to check this
        return {'error': 'Invalid username'}, 404
    
    # TODO: check if provided password matches the stored encrypted password

    if passwordDoesNotMatch: # figure out how to check this
        return {'error': 'Incorrect password'}, 401
    
    # TODO: delete user AND ALL ASSOCIATED HABITS/TASKS from respective db's

    return '', 204 # empty 204 if successful