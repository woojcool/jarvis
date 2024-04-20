from flask import Flask, request
from flask_cors import CORS
from blueprints.auth import auth
from blueprints.habits import habits
from blueprints.tasks import tasks


app = Flask(__name__)
CORS(app)
app.register_blueprint(auth)
app.register_blueprint(habits)
app.register_blueprint(tasks)

# just to ensure the api is up and running
@app.route('/test', methods=['GET'])
def test():
    return "App is up and running", 201


if __name__ == '__main__':
    app.run(debug=True)
