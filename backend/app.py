from flask import Flask, request
from flask_cors import CORS
from blueprints.auth import auth_bp
from blueprints.habits import habits_bp
from blueprints.tasks import tasks_bp



app = Flask(__name__)
CORS(app)
app.register_blueprint(auth_bp)
app.register_blueprint(habits_bp)
app.register_blueprint(tasks_bp)

# just to ensure the api is up and running
@app.route('/test', methods=['GET'])
def test():
    return "App is up and running", 200


if __name__ == '__main__':
    app.run(debug=True)
