from flask import Flask, jsonify, request, json, make_response, url_for, redirect, abort
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
from rave_python import Rave, RaveExceptions, Misc
from app_backend.models import (Users, Reservations, Slots,
                                UsersSchema, SlotsSchema, ReservationsSchema)

# Exceptions for sqlachemy
from sqlalchemy.exc import IntegrityError


# create an instance for the SlotsSchema i.e. slot_schema is for single data, slots_schema is when data is more than one
slot_schema = SlotsSchema()
slots_schema = SlotsSchema(many=True)
reservation_schema = ReservationsSchema()
reservations_schema = ReservationsSchema(many=True)


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
            return jsonify({'message': 'Token is not valid!'}), 403
        return f(current_user, *args, **kwargs)

    return decorated

    # @route GET api/auth/users
    # @desc GET all users data === action performed by Admin only
    # @access Private


@app.route('/api/auth/users', methods=['GET'])
@token_required
def getAuthUsers(current_user):

    if not current_user.admin:
        return jsonify({'message': 'None admin users cannot perform that function!'}), 403

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

    return jsonify({'users': output}), 201

    # @route GET api/auth/user
    # @desc GET current_user access by token
    # @access Private


@app.route('/api/auth/user', methods=['GET'])
@token_required
def getAuthUser(current_user):

    user = Users.query.filter_by(public_id=current_user.public_id).first()
    if not user:
        return jsonify({'message': 'No user found!'}), 401

    user_data = {}
    user_data['public_id'] = user.public_id
    user_data['username'] = user.username
    user_data['email'] = user.email
    user_data['phone_number'] = user.phone_number
    user_data['admin'] = user.admin

    return jsonify({'user': user_data}), 201

    # @route GET api/user
    # @desc GET current_user data by id
    # @access Private


@app.route('/api/user/<public_id>', methods=['GET'])
@token_required
def get_one_user(current_user, public_id):

    if not current_user.admin:
        return jsonify({'message': 'None admin users cannot perform that function!'}), 403

    user = Users.query.filter_by(public_id=public_id).first()
    if not user:
        return jsonify({'message': 'No user found!'}), 401

    user_data = {}
    user_data['public_id'] = user.public_id
    user_data['username'] = user.name
    user_data['email'] = user.email
    user_data['phone_number'] = user.phone_number
    user_data['admin'] = user.admin

    return jsonify({'user': user_data}), 201

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

        return jsonify({'message': 'New user created!'}), 201
    except IntegrityError:
        # the rollback func reverts the changes made to the db ( so if an error happens after we commited changes they will be reverted )
        db.session.rollback()
        return jsonify({'msg': 'User already exists'}), 403

        # @route PUT api/user
        # @desc PUT promote user to an admin
        # @access Private


@app.route('/api/user/<public_id>', methods=['PUT'])
@token_required
def promote_user(current_user, public_id):
    if not current_user.admin:
        return jsonify({'message': 'None admin users cannot perform that function!'}), 403

    user = Users.query.filter_by(public_id=public_id).first()
    if not user:
        return jsonify({'message': 'No user found!'}), 401

    user.admin = True
    db.session.commit()

    return jsonify({'message': 'The user has been promoted to an admin!'}), 201

    # @route DELETE api/user
    # @desc DELETE remove user
    # @access Private


@app.route('/api/user/<public_id>', methods=['DELETE'])
@token_required
def delete_user(current_user, public_id):
    if not current_user.admin:
        return jsonify({'message': 'None admin users cannot perform that function!'}), 403

    user = Users.query.filter_by(public_id=public_id).first()
    if not user:
        return jsonify({'message': 'No user found!'}), 401

    db.session.delete(user)
    db.session.commit()

    return jsonify({'message': 'The user has been deleted!'}), 201

    # @route POST api/auth
    # @desc POST Authenticate user
    # @access Public


@app.route('/api/auth', methods=['POST'])
def authUser():
    data = request.get_json()

    # Simple validation
    if not data or not data['email'] or not data['password']:
        return jsonify({'message': 'Please enter all fields!'}), 401

    # Check for existing user
    user = Users.query.filter_by(email=data['email']).first()

    if not user:
        return jsonify({'message': 'User does not exist!'}), 403

    # Validate password
    if check_password_hash(user.password, data['password']):
        token = jwt.encode({'public_id': user.public_id, 'exp': datetime.datetime.utcnow(
        ) + datetime.timedelta(minutes=1080)}, app.config['JWT_SECRET_KEY'])
        return jsonify({'token': token.decode('UTF-8')}), 201
    return jsonify({'message': 'Invalid Credentials!'}), 403

    # @route GET/POST api/reset_password
    # @desc reset user password
    # @access Public


def send_reset_email(user):
    token = user.get_reset_token()
    msg = Message('Password Reset Request',
                  sender='noreply@demo.com', recipients=[user.email])

    # response = redirect('http://localhost:3000/reset_password')
    # response.headers = {'authorization': token}

    # print(response)

    # return response


# {url_for('reset_token', token=token, _external=True)}
    msg.html = f'''To reset your password, visit the following link:
{url_for('reset_token', token=token, _external=True)}

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
    # @desc GET get all reservations for all users
    # @access Private


@app.route('/api/reservation', methods=['GET'])
def get_all_reservations():
    reservations = Reservations.query.all()

    # the instance === reservation_schema === references when the data being queried is one. If more than one then change it to === reservations_schema ===
    output = reservations_schema.dump(reservations)

    return jsonify({'result': output}), 200

    # @route GET api/reservation
    # @desc GET get all reservations for a specific user
    # @access Private


@app.route('/api/user/reservations', methods=['GET'])
@token_required
def get_user_reservations(current_user):
    reservations = Reservations.query.filter_by(user_id=current_user.id).all()

    # the instance === reservation_schema === references when the data being queried is one. If more than one then change it to === reservations_schema ===
    output = reservations_schema.dump(reservations)

    return jsonify({'result': output}), 200

    # @route GET api/reservation/<reservation_id>
    # @desc GET get one reservation for a specific user and not admin
    # @access Private


@app.route('/api/reservation/<reservation_id>', methods=['GET'])
@token_required
def get_one_user_reservation(current_user, reservation_id):
    reservation = Reservations.query.filter_by(
        id=reservation_id, user_id=current_user.id).first()

    output = reservation_schema.dump(reservation)

    return jsonify({'result': output}), 200

    # @route POST api/reservation
    # @desc POST create reservation
    # @access Private


@app.route('/api/reservation', methods=['POST'])
@token_required
def create_reservation(current_user):
    data = request.get_json()

    # Simple validation
    if not data or not data['slot_number'] or not data['zone'] or not data['cost'] or not data['reserved_date'] or not data['reserved_slot']:
        return jsonify({'msg': 'Please enter all fields!'}), 401

    # Check for existing reservation
    reservation_exist = Reservations.query.filter_by(
        reserved_slot=data['reserved_slot'], user_id=current_user.id).first()

    if reservation_exist:
        return jsonify({'message': 'Reservation already exits'}), 403

    new_reservation = Reservations(public_reservation_id=str(uuid.uuid4()),
                                   slot_number=data['slot_number'],
                                   reserved_date=data['reserved_date'], reserved_slot=data['reserved_slot'],
                                   cost=data['cost'], zone=data['zone'], complete=False, user_id=current_user.id)
    db.session.add(new_reservation)
    db.session.commit()

    return jsonify({'message': "Reservation created!"}), 201

    # @route PUT api/reservation/<reservation_id>
    # @desc PUT update one reservation
    # @access Private


@app.route('/api/reservation/<reservation_id>', methods=['PUT'])
@token_required
def complete_reservation(current_user, reservation_id):
    reservation = Reservations.query.filter_by(
        id=reservation_id, user_id=current_user.id).first()

    if not reservation:
        return jsonify({'message': 'No reservation found!'}), 403

    reservation.complete = True
    db.session.commit()

    return jsonify({'message': 'Slot has been reserved successfully!'}), 201

    # @route DELETE api/reservation/<reservation_id>
    # @desc DELETE  reservation
    # @access Private


@app.route('/api/reservation/<reservation_id>', methods=['DELETE'])
@token_required
def delete_reservation(current_user, reservation_id):
    reservation = Reservations.query.filter_by(
        id=reservation_id, user_id=current_user.id).first()

    if not reservation:
        return jsonify({'message': 'No reservation found!'}), 403

    db.session.delete(reservation)
    db.session.commit()

    return jsonify({'message': 'Reservation item deleted!'}), 201

    # @route POST api/slots
    # @desc POST slot
    # @access Private


@app.route('/api/slots', methods=['POST'])
@token_required
def addSlots(current_user):
    if not current_user.admin:
        return jsonify({'message': 'None admin users cannot perform that function!'}), 403

    data = request.get_json()

    # Simple validation
    if not data or not data['slot_name'] or not data['zone']:
        return jsonify({'msg': 'Please enter all fields!'}), 401

    # Check for existing slot
    slot_exist = Slots.query.filter_by(
        slot_name=data['slot_name'], zone=data['zone']).first()

    if slot_exist:
        return jsonify({'message': 'slot already exists'}), 403

    newSlot = Slots(slot_name=data['slot_name'], zone=data['zone'])

    db.session.add(newSlot)
    db.session.commit()

    return jsonify({'message': "slot created!"}), 201

    # @route GET api/slots
    # @desc GET slots
    # @access Private


@app.route('/api/slots', methods=['GET'])
def get_all_slots():

    slots = Slots.query.all()

    if not slots:
        return jsonify({'message': 'No slots found!'}), 401

    # Main object
    output = []

    for slot in slots:

        # Declare date object
        dates = []

        today = datetime.date.today()
        number_of_days = 7

        for day in range(number_of_days):
            a_date = (today + datetime.timedelta(days=day)).isoformat()
            dates.append(a_date)

        # declare objects
        slots_data = {}
        slot_details = {}
        slot_id = {}
        slot_id1 = {}
        slot_id2 = {}
        slot_id3 = {}
        slot_id4 = {}
        slot_id5 = {}
        slot_id6 = {}

        # Populate data in slots_data object
        slots_data['id'] = slot.id
        slots_data['slot_name'] = slot.slot_name
        slots_data['zone'] = slot.zone
        slots_data['slot_details'] = slot_details

        # Populate data in slot_details object
        slot_details['slot_id'] = slot_id
        slot_details['slot_id1'] = slot_id1
        slot_details['slot_id2'] = slot_id2
        slot_details['slot_id3'] = slot_id3
        slot_details['slot_id4'] = slot_id4
        slot_details['slot_id5'] = slot_id5
        slot_details['slot_id6'] = slot_id6

        # Populate data in the respective slot_id's
        slot_id['id'] = f'{slot.id}{dates[0]}'
        slot_id['reserved'] = False
        slot_id['toggled'] = False 
        slot_id['cost'] = 300 
        slot_id['date'] = f'{dates[0]}'

        slot_id1['id'] = f'{slot.id}{dates[1]}'
        slot_id1['reserved'] = False 
        slot_id1['toggled'] = False 
        slot_id1['cost'] = 300 
        slot_id1['date'] = f'{dates[1]}'

        slot_id2['id'] = f'{slot.id}{dates[2]}'
        slot_id2['reserved'] = False
        slot_id2['toggled'] = False 
        slot_id2['cost'] = 300 
        slot_id2['date'] = f'{dates[2]}'

        slot_id3['id'] = f'{slot.id}{dates[3]}'
        slot_id3['reserved'] = False
        slot_id3['toggled'] = False 
        slot_id3['cost'] = 300 
        slot_id3['date'] = f'{dates[3]}'

        slot_id4['id'] = f'{slot.id}{dates[4]}'
        slot_id4['reserved'] = False 
        slot_id4['toggled'] = False 
        slot_id4['cost'] = 300 
        slot_id4['date'] = f'{dates[4]}'

        slot_id5['id'] = f'{slot.id}{dates[5]}'
        slot_id5['reserved'] = False 
        slot_id5['toggled'] = False 
        slot_id5['cost'] = 300 
        slot_id5['date'] = f'{dates[5]}'

        slot_id6['id'] = f'{slot.id}{dates[6]}'
        slot_id6['reserved'] = False 
        slot_id6['toggled'] = False 
        slot_id6['cost'] = 300 
        slot_id6['date'] = f'{dates[6]}'
               
        output.append(slots_data)


    return jsonify({'result': output}), 201


    # @route DELETE api/slots
    # @desc DELETE slot
    # @access Private

@app.route('/api/slots/<slot_id>', methods=['DELETE'])
@token_required
def deleteSlots(current_user, slot_id):
    if not current_user.admin:
        return jsonify({'message': 'None admin users cannot perform that function!'}), 403

    # Check for existing slot
    slot_exist = Slots.query.filter_by(id=slot_id).first()

    if not slot_exist:
        return jsonify({'message': 'No slot found!'}), 403

    db.session.delete(slot_exist)
    db.session.commit()

    return jsonify({'message': 'Slot has been deleted!'}), 201

    # @route PUT api/slots
    # @desc PUT slot
    # @access Private


@app.route('/api/slots/<slot_id>', methods=['PUT'])
@token_required
def updateSlots(current_user, slot_id):
    if not current_user.admin:
        return jsonify({'message': 'None admin users cannot perform that function!'}), 403

    data = request.get_json()

    # Simple validation
    if not data or not data['slot_name'] or not data['zone']:
        return jsonify({'msg': 'Please enter all fields!'}), 401

    # Check for existing slot
    slot_exist = Slots.query.filter_by(id=slot_id).first()

    if not slot_exist:
        return jsonify({'message': 'No slot found!'}), 403

    slot_exist.slot_name = data['slot_name']
    slot_exist.zone = data['zone']
    db.session.commit()

    return jsonify({'message': 'Slot has been updated!'}), 201


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


# Function to create a temporary access token for the webhook url
# The function stores IP addresses (key) and the time they validated (value).
# In order for an IP to become validated, they need to send a GET request with a parameter verif_hash  equal to our webhooks token.
# Once an IP is registered the webhook will accept POSTs from it, the same as previously.
def temp_token():
    import binascii
    temp_token = binascii.hexlify(os.urandom(24))
    return temp_token.decode('utf-8')


CLIENT_AUTH_TIMEOUT = 24  # in Hours

# Since we only store the authorised IP addresses in a dictionary, they're lost whenever the application closes. You could store these into a file format, or even a database.
# Flask-SQLAlchemy makes or simplifies using databases with Flask!
authorised_clients = {}

# @route POST/GET /webhook
# @desc POST/GET === Primarily we use webhooks to share information about an event that happened on your account with you. These events could range from a successful transaction to a failed transaction or even a new debit on your account. ===
# @access Private


@app.route('/webhook', methods=['GET', 'POST'])
def webhook():
    from datetime import datetime, timedelta
    # WEBHOOK_VERIFY_TOKEN = app.config['WEBHOOK_VERIFY_TOKEN']
    if 'verif-hash' in request.headers:
        verify_token = request.headers['verif-hash']
        if verify_token == app.config['WEBHOOK_VERIFY_TOKEN']:
            authorised_clients[request.remote_addr] = datetime.now()
            return jsonify({'status': 'success'}), 200
        else:
            return jsonify({'status': 'bad token'}), 401

    elif request.method == 'POST':
        client = request.remote_addr
        if client in authorised_clients:
            if datetime.now() - authorised_clients.get(client) > timedelta(hours=CLIENT_AUTH_TIMEOUT):
                authorised_clients.pop(client)
                return jsonify({'status': 'authorisation timeout'}), 401
            else:
                print(request.json)
                return jsonify({'status': 'success'}), 200
        else:
            return jsonify({'status': 'not authorised'}), 401

    else:
        abort(400)

    # @route POST /payment
    # @desc POST Mpesa Payment API via Flutterwave
    # @access Private


@app.route('/payment', methods=['POST'])
def payment():
    data = request.get_json()

    rave = Rave(app.config['MPESA_PUBLIC_KEY'],
                app.config['MPESA_PRIVATE_KEY'], usingEnv=False)

    # mobile payload
    payload = {
        "amount": data["amount"],
        "phonenumber": data["phonenumber"],
        "email": data["email"],
        "narration": data["narration"],
        "fullname": data["fullname"],
        "IP": data["IP"]
    }
    print(payload)

    try:
        res = rave.Mpesa.charge(payload)
        res = rave.Mpesa.verify(res["txRef"])
        print(res)
        return jsonify({'status': 'payment successful'}), 200

    except RaveExceptions.TransactionChargeError as e:
        print(e.err["errMsg"])
        print(e.err["flwRef"])
        return jsonify({'status': 'Transaction not successful'}), 403

    except RaveExceptions.TransactionVerificationError as e:
        print(e.err["errMsg"])
        print(e.err["txRef"])
        return jsonify({'status': 'Transaction verification failed'}), 403


# @app.route('/search', methods=['GET', 'POST'])
# def search():
#     searchForm = searchForm()
#     courses = models.Course.query

#     if searchForm.validate_on_submit():
#         courses = courses.filter(models.Course.name.like('%' + searchForm.courseName.data + '%'))

#     courses = courses.order_by(models.Course.name).all()

#     return render_template('courselist.html', courses = courses)