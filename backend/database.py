from pymongo import MongoClient
from config import MONGODB_HOST

client = MongoClient(MONGODB_HOST)

db = client.jarvis

users = db.users
habits = db.habits
tasks = db.tasks
