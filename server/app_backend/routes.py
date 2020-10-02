from flask import Flask, jsonify, request, json, make_response, url_for, redirect
import datetime
import uuid
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import (create_access_token)
from sqlalchemy import desc, func, and_
from app_backend import app, db, bcrypt, jwt, socketio, mail
from flask_mail import Message
import jwt
from functools import wraps
from flask_socketio import emit
from app_backend.models import (Users, Reservations, Zones,
                                UsersSchema, ZonesSchema, ReservationsSchema)

# Exceptions for sqlachemy
from sqlalchemy.exc import IntegrityError


# create an instance for the ZonesSchema i.e. zone_schema is for single data, zones_schema is when data is more than one
zone_schema = ZonesSchema()
zones_schema = ZonesSchema(many=True)

# reservation = ReservationsSchema()
# reservations = ReservationsSchema(many=True)


# auth middleware to enable private routes
def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'x-access-token' in request.headers:
            token = request.headers['x-access-token']

        # Check for token
        if not token:
            return jsonify({'message': 'No token, authorization denied!'}), 401
        try:
            # Verify token
            data = jwt.decode(token, app.config['JWT_SECRET_KEY'])

            # Add user from payload
            current_user = Users.query.filter_by(
                public_id=data['public_id']).first()
        except:
            return jsonify({'message': 'Token is not valid!'}), 401
        return f(current_user, *args, **kwargs)

    return decorated

    # @route GET api/auth/users
    # @desc GET all users data === action performed by Admin only
    # @access Private


@app.route('/api/auth/users', methods=['GET'])
@token_required
def getAuthUsers(current_user):

    if not current_user.admin:
        return jsonify({'message': 'None admin users cannot perform that function!'})

    users = Users.query.all()

    output = []

    for user in users:
        user_data = {}
        user_data['public_id'] = user.public_id
        user_data['username'] = user.name
        user_data['email'] = user.email
        user_data['phone_number'] = user.phone_number
        user_data['admin'] = user.admin

        output.append(user_data)

    return jsonify({'users': output})

    # @route GET api/auth/user
    # @desc GET current_user access by token
    # @access Private


@app.route('/api/auth/user', methods=['GET'])
@token_required
def getAuthUser(current_user):

    user = Users.query.filter_by(public_id=current_user.public_id).first()
    if not user:
        return jsonify({'message': 'No user found!'})

    user_data = {}
    user_data['public_id'] = user.public_id
    user_data['username'] = user.username
    user_data['email'] = user.email
    user_data['phone_number'] = user.phone_number
    user_data['admin'] = user.admin

    return jsonify({'user': user_data})

    # @route GET api/user
    # @desc GET current_user data by id
    # @access Private


@app.route('/api/user/<public_id>', methods=['GET'])
@token_required
def get_one_user(current_user, public_id):

    if not current_user.admin:
        return jsonify({'message': 'None admin users cannot perform that function!'})

    user = Users.query.filter_by(public_id=public_id).first()
    if not user:
        return jsonify({'message': 'No user found!'})

    user_data = {}
    user_data['public_id'] = user.public_id
    user_data['username'] = user.name
    user_data['email'] = user.email
    user_data['phone_number'] = user.phone_number
    user_data['admin'] = user.admin

    return jsonify({'user': user_data})

    # @route POST api/users
    # @desc POST create new user
    # @access Public


@app.route('/api/users', methods=['POST'])
def create_user():
    try:

        data = request.get_json()

        # Simple validation
        if not data or not data['username'] or not data['email'] or not data['phone_number'] or not data['password'] or not data['confirm_password']:
            return jsonify({'msg': 'Please enter all fields!'}), 403

        # Check for existing user
        user = Users.query.filter_by(
            email=data['email'], phone_number=data['phone_number']).first()
        if user:
            return jsonify({'msg': 'User already exists'}), 401

        hashed_password = generate_password_hash(
            data['password'], method="sha256")
        hashed_confirm_password = generate_password_hash(
            data['confirm_password'], method="sha256")

        new_user = Users(public_id=str(uuid.uuid4()),
                         email=data['email'],
                         username=data['username'],
                         phone_number=data['phone_number'],
                         password=hashed_password,
                         confirm_password=hashed_confirm_password,
                         admin=False)

        db.session.add(new_user)
        db.session.commit()

        return jsonify({'message': 'New user created!'})
    except IntegrityError:
        # the rollback func reverts the changes made to the db ( so if an error happens after we commited changes they will be reverted )
        db.session.rollback()
        return jsonify({'msg': 'User already exists'}), 401

        # @route PUT api/user
        # @desc PUT promote user to an admin
        # @access Private


@app.route('/api/user/<public_id>', methods=['PUT'])
@token_required
def promote_user(current_user, public_id):
    if not current_user.admin:
        return jsonify({'message': 'None admin users cannot perform that function!'})

    user = Users.query.filter_by(public_id=public_id).first()
    if not user:
        return jsonify({'message': 'No user found!'})

    user.admin = True
    db.session.commit()

    return jsonify({'message': 'The user has been promoted to an admin!'})

    # @route DELETE api/user
    # @desc DELETE remove user
    # @access Private


@app.route('/api/user/<public_id>', methods=['DELETE'])
@token_required
def delete_user(current_user, public_id):
    if not current_user.admin:
        return jsonify({'message': 'None admin users cannot perform that function!'})

    user = Users.query.filter_by(public_id=public_id).first()
    if not user:
        return jsonify({'message': 'No user found!'})

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'The user has been deleted!'})

    # @route POST api/auth
    # @desc POST Authenticate user
    # @access Public


@app.route('/api/auth', methods=['POST'])
def authUser():
    data = request.get_json()

    # Simple validation
    if not data or not data['email'] or not data['password']:
        return jsonify({'message': 'Please enter all fields!'}), 403

    # Check for existing user
    user = Users.query.filter_by(email=data['email']).first()

    if not user:
        return jsonify({'message': 'User does not exist!'}), 401

    # Validate password
    if check_password_hash(user.password, data['password']):
        token = jwt.encode({'public_id': user.public_id, 'exp': datetime.datetime.utcnow(
        ) + datetime.timedelta(minutes=1080)}, app.config['JWT_SECRET_KEY'])
        return jsonify({'token': token.decode('UTF-8')})
    return jsonify({'message': 'Invalid Credentials!'}), 401

    # @route GET/POST api/reset_password
    # @desc reset user password
    # @access Public


def send_reset_email(user):
    token = user.get_reset_token()
    msg = Message('Password Reset Request',
                  sender='noreply@demo.com', recipients=[user.email])

# {url_for('reset_token', token=token, _external=True)}
    msg.html = f'''To reset your password, visit the following link:
{redirect('http://localhost:3000/reset_password/:token',token)}

If you did not make this request then simply ignore this email and no changes will be made.
'''

    mail.send(msg)


@app.route('/api/reset_password', methods=['GET', 'POST'])
def reset_request():
    data = request.get_json()

    # Simple validation
    if not data or not data['email']:
        return jsonify({'message': 'Please enter field!'}), 403

    # Check for existing user
    user = Users.query.filter_by(email=data['email']).first()

    if not user:
        return jsonify({'message': 'There is no account with that email. You must register first!'}), 401

    send_reset_email(user)
    return jsonify({'message': 'An email has been sent with instructions to reset your password!'}), 200

    # @route GET/POST api/reset_password/<token>
    # @desc check if token is valid on password reset
    # @access Public


@app.route('/api/reset_password/<token>', methods=['GET', 'POST'])
def reset_token(token):
    data = request.get_json()

    # Simple validation
    if not data or not data['password'] or not data['confirm_password']:
        return jsonify({'message': 'Please enter all fields!'}), 403

    # Verify user token
    user = Users.verify_reset_token(token)

    if user is None:
        return jsonify({'message': 'That is an invalid or expired token!'}), 403
    user.password = generate_password_hash(
        data['password'], method="sha256")
    db.session.commit()

    return jsonify({'message': 'Your password has been updated! You are now able to login'}), 200

    # @route GET api/reservation
    # @desc GET get all reservations
    # @access Private


@app.route('/api/reservation', methods=['GET'])
@token_required
def get_all_reservations(current_user):
    reservations = Reservations.query.filter_by(user_id=current_user.id).all()

    output = []

    for reservation in reservations:
        reservation_data = {}
        reservation_data['id'] = todo.id
        reservation_data['entry_date'] = reservation.entry_date
        reservation_data['exit_date'] = reservation.exit_date
        reservation_data['complete'] = reservation.complete
        output.append(reservation_data)

    return jsonify({'reservations': output})

    # @route GET api/reservation/<reservation_id>
    # @desc GET get one reservation
    # @access Private


@app.route('/api/reservation/<reservation_id>', methods=['GET'])
@token_required
def get_one_reservation(current_user, reservation_id):
    reservation = Reservations.query.filter_by(
        id=reservation_id, user_id=current_user.id).first()

    if not reservation:
        return jsonify({'message': 'No reservation found!'})
        reservation_data = {}
        reservation_data['id'] = todo.id
        reservation_data['entry_date'] = reservation.entry_date
        reservation_data['exit_date'] = reservation.exit_date
        reservation_data['complete'] = reservation.complete

    return jsonify(reservation_data)

    # @route POST api/reservation
    # @desc POST create reservation
    # @access Private


@app.route('/api/reservation', methods=['POST'])
@token_required
def create_reservation(current_user):
    data = request.get_json()

    new_reservation = Reservations(public_reservation_id=str(uuid.uuid4()),
                                   entry_date=data['entry_date'], exit_date=data['exit_date'], complete=False, user_id=current_user.id)
    db.session.add(new_reservation)
    db.session.commit()

    return jsonify({'message': "Reservation created!"})

    # @route PUT api/reservation/<reservation_id>
    # @desc PUT update one reservation
    # @access Private


@app.route('/api/reservation/<reservation_id>', methods=['PUT'])
@token_required
def complete_reservation(current_user, reservation_id):
    reservation = Reservations.query.filter_by(
        id=reservation_id, user_id=current_user.id).first()

    if not reservation:
        return jsonify({'message': 'No reservation found!'})

    reservation.complete = True
    db.session.commit()

    return jsonify({'message': 'Reservation item has been completed!'})

    # @route DELETE api/reservation/<reservation_id>
    # @desc DELETE  reservation
    # @access Private


@app.route('/api/reservation/<reservation_id>', methods=['DELETE'])
@token_required
def delete_reservation(current_user, reservation_id):
    reservation = Reservations.query.filter_by(
        id=reservation_id, user_id=current_user.id).first()

    if not reservation:
        return jsonify({'message': 'No reservation found!'})

    db.session.delete(reservation)
    db.session.commit()

    return jsonify({'message': 'Reservation item deleted!'})


# @route /
# @desc
# @access Public


@app.route('/', methods=['GET'])
def dashboard():
    return {
        "user_id": 1,
        "title": "Flask react application",
        "completed": False
    }


# @route == description == add zones
@app.route('/zones/admin', methods=['POST'])
def zonesAddAdmin():
    capacity = request.get_json()['capacity']
    slot = request.get_json()['slot']
    zone = request.get_json()['zone']
    info = ""

    if slot <= capacity:

        zones = Zones(capacity=capacity, slot=slot, zone=zone)

        db.session.add(zones)
        db.session.commit()

        info = {
            "capacity": capacity,
            "slot": slot,
            "zone": zone
        }
        return {'info': info}, 201
    else:
        info = "Number of slots cannot exceed capacity"
        return {'info_exceed': info}, 403


# @route == description == get zones


@app.route('/zones/admin', methods=['GET'])
def zonesGetAdmin():

    # order data in descending order, then query the first data which will be the latest entered data by the user_admin
    all_zones = Zones.query.order_by(Zones.id.desc()).first()
    # the instance === zone_schema === references when the data being queried is one. If more than one then change it to === zones_schema ===
    result = zone_schema.dump(all_zones)
    return jsonify({'zones': result}), 200

# @route == description == update zones


@app.route('/zones/admin/<id>', methods=['PUT'])
def zonesUpdateAdmin(id):
    zoneID = Zones.query.get(id)

    capacity = request.get_json()['capacity']
    slot = request.get_json()['slot']
    zone = request.get_json()['zone']
    info = ""

    if slot <= capacity:

        zoneID.capacity = capacity
        zoneID.slot = slot
        zoneID.zone = zone

        db.session.commit()

        return zone_schema.jsonify(zoneID), 201
    else:
        info = "Number of slots cannot exceed capacity"
        return {'info_exceed': info}, 403

# @route == description == delete zones


@app.route('/zones/admin/<id>', methods=['DELETE'])
def zonesDeleteAdmin(id):
    zone = Zones.query.get(id)
    db.session.delete(zone)
    db.session.commit()

    return zone_schema.jsonify(zone)

# connection to socket io


@socketio.on('connect')
def test_connect():
    emit('my response', {'data': 'Client successfully connected!'})
    print('Client connected...!')

# disconnection to socket io


@socketio.on('disconnect')
def test_disconnect():
    print('Client disconnected...!')


# creating a web socket for realtime data to all clients
# @socketio.on('reserve-time')
# def timer(data):
#     reservation
#     emit('This slot is reserved', data, broadcast=True)
