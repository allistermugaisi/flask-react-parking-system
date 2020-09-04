from flask import Flask, jsonify, request, json, make_response
from datetime import datetime
from flask_jwt_extended import (create_access_token)
from sqlalchemy import desc, func
from app_backend import app, db, bcrypt, jwt
from app_backend.models import User, Reservations, Zones, ZonesSchema, ReservationsSchema

# Exceptions for sqlachemy
from sqlalchemy.exc import IntegrityError


# create an instance for the ZonesSchema i.e. zone_schema is for single data, zones_schema is when data is more than one
zone_schema = ZonesSchema()
zones_schema = ZonesSchema(many=True)

# reservation = ReservationsSchema()
# reservations = ReservationsSchema(many=True)

# @route /


@app.route('/', methods=['GET'])
def dashboard():
    return {
        "user_id": 1,
        "title": "Flask react application",
        "completed": False
    }


# @route == description == register users
@app.route('/users/register', methods=['POST'])
def register():
    try:
        username = request.get_json()['username']
        email = request.get_json()['email']
        phone_number = request.get_json()['phone_number']
        password = request.get_json()['password']
        confirm_password = request.get_json()['confirm_password']
        result = ""

        if password == confirm_password:
            hashed_password = bcrypt.generate_password_hash(
                request.get_json()['password']).decode('utf-8')
            confirm_hashed_password = bcrypt.generate_password_hash(
                request.get_json()['confirm_password']).decode('utf-8')

            user = User(username=username, email=email, phone_number=phone_number,
                        password=hashed_password, confirm_password=confirm_hashed_password)

            db.session.add(user)
            db.session.commit()

            result = {
                'username': username,
                'email': email,
                'phone_number': phone_number,
                'password': hashed_password,
            }

            return {'result': result}, 201

        else:
            result = "Passwords do not match"
            return {'password_match': result}, 401
    except IntegrityError:
        # the rollback func reverts the changes made to the db ( so if an error happens after we commited changes they will be reverted )
        db.session.rollback()
        return {"user_exist": "User already exists"}, 403
    except AttributeError:
        return 'Provide an Email and Password in JSON format in the request body', 400


# @route == description == login users
@app.route('/users/login', methods=['POST'])
def login():
    try:
        email = request.get_json()['email']
        password = request.get_json()['password']
        result = ""

        user = User.query.filter_by(email=email).first()

        if user and bcrypt.check_password_hash(user.password, password):
            access_token = create_access_token(identity={'username': user.username, 'email': user.email,
                                                         'phone_number': user.phone_number,
                                                         })

            result = access_token
            return {"access_token": result}, 201

        else:
            result = {"access_denied": "Invalid username or password"}
            return result, 401
    except AttributeError:
        return 'Provide an Email and Password in JSON format in the request body', 400


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


# @route == description == reservation info
@app.route('/api/reservation', methods=['POST'])
def reservation():
    try:
        username = request.get_json()['username']
        phone_number = request.get_json()['phone_number']
        entry_date = request.get_json()['entry_date']
        exit_date = request.get_json()['exit_date']
        info = ""

        user = User.query.filter_by(username=username).first()

        # === is not None === checks if data is in the database else it will error out Attribute error
        # if user is not None and user.username == username and user.phone_number == phone_number:

        reservations = Reservations(
            username=username, phone_number=phone_number, entry_date=entry_date, exit_date=exit_date, user_id=user.id)

        db.session.add(reservations)
        db.session.commit()

        info = {
            "username": username,
            "phone_number": phone_number,
            "entry_date": entry_date,
            "exit_date": exit_date,
        }
        return {'info': info}, 201
        # else:
        #     denied = {"access_denied": "Invalid username or phone number"}
        #     return denied, 401
    except AttributeError:
        return 'Provide a username, phone_number, entry_date and exit_date in JSON format in the request body', 400
