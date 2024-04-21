from pymongo import MongoClient
from config import MONGODB_HOST
from bcrypt import hashpw
from config import SECRET_SALT

client = MongoClient(MONGODB_HOST)

db = client.jarvis

users = db.users
habits = db.habits
tasks = db.tasks
tokens = db.tokens


def authenticate(token):
    if not token: 
        return None
    hashed_token = hashpw(token.encode('utf-8'), SECRET_SALT)
    entry = tokens.find_one({"token": hashed_token})
    if not entry:
        return None
    userID = entry['userID']
    
    return userID