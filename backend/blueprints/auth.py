from flask import Blueprint, request
from database import users, tokens
from bcrypto import bcrypt
from flask_login import current_user, login_required, login_user, logout_user
from flask import Blueprint, redirect, url_for, render_template, flash, request
import secrets
from bcrypt import hashpw
from config import SECRET_SALT


auth_bp = Blueprint("auth", __name__, url_prefix='/auth')

@auth_bp.route('/register', methods=["POST"])
def register():
    body = request.get_json(force=True)
    username = body['username']
    password = body['password']

    if not username or not password:
        return {'error': 'Invalid username or password'}, 400
    # TODO: securely insert username/pass into "users" db (imported above)

    if users.find_one({"username": username}):
        return {'error': 'Username already exists'}, 409

    hashed_password = bcrypt.generate_password_hash(password).decode('utf-8')
    token = secrets.token_urlsafe()
    hashed_token = hashpw(token.encode('utf-8'), SECRET_SALT)
    new_user = {"username": username, "password": hashed_password}
    result = users.insert_one(new_user)
    tokens.insert_one({'userID': result.inserted_id, 'token':hashed_token})
    return {'token': token}, 201

@auth_bp.route('/login', methods=["POST"])
def login():
    body = request.get_json(force=True)
    username = body['username']
    password = body['password']

    user = users.find_one({"username": username})
    if user and bcrypt.check_password_hash(user['password'], password):
        token = secrets.token_urlsafe()
        hashed_token = hashpw(token.encode('utf-8'), SECRET_SALT)
        tokens.insert_one({'userID': user['_id'], 'token':hashed_token})
        return {'token': token}
    
    else:
        return {'error': 'Invalid username or password'}, 401 


@auth_bp.route('/logout', methods=["POST"])
def logout():
    token = request.headers.get('Authorization')
    hashed_token = hashpw(token.encode('utf-8'), SECRET_SALT)
    tokens.delete_one({"token": hashed_token})
    return '', 204



@auth_bp.route('/delete', methods=["DELETE"])
def delete():
    body = request.get_json(force=True)
    username = body['username']
    password = body['password']
    
    user = users.find_one({"username": username})
    if not user:
        return {'error': 'Invalid username'}, 404
    
    if bcrypt.check_password_hash(user['password'], password):
        users.delete_one({"username": username})
        tokens.delete_many({"userID": user['_id']})
        return '', 204
    else:
        return {'error': 'Incorrect password'}, 401