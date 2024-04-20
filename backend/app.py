from flask import Flask
from blueprints.auth import auth
from blueprints.habits import habits
from blueprints.tasks import tasks
from flask_bcrypt import Bcrypt


app = Flask(__name__)
app.register_blueprint(auth)
app.register_blueprint(habits)
app.register_blueprint(tasks)
bcrypt = Bcrypt()


if __name__ == '__main__':
    app.run(debug=True)
