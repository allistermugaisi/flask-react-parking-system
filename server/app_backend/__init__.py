from flask import Flask
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from flask_marshmallow import Marshmallow
from flask_jwt_extended import JWTManager
from flask_sqlalchemy import SQLAlchemy
from flask_socketio import SocketIO
from flask_mail import Mail


app = Flask(__name__)

from app_backend import config

socketio = SocketIO(app, cors_allowed_origins="*")
db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
jwt = JWTManager(app)
ma = Marshmallow(app)
CORS(app)
mail = Mail(app)


# To avoid SQLAlchemy circular import, do the import at the bottom.
from app_backend import routes
