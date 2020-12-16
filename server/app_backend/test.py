import datetime
import calendar
import time


# today = datetime.date.today()
# days_in_current_month = calendar.monthrange(today.year, today.month)[1]
# days_till_end_month = days_in_current_month - today.day


# now = datetime.now()
# entry_date = datetime(2020, 9, 19, 23, 30, 30)
# exit_date = datetime(2020, 10, 3, 23, 30, 30)
# duration = exit_date - entry_date
# current_reservation_time = exit_date - now

# elapse_time = entry_date + duration
# print(current_reservation_time)

today = datetime.date.today()
start_day = today
three_weeks = [start_day + datetime.timedelta(days=x) for x in range(7)]

# print(start_day)
# print(three_weeks)
number_of_days = 7

date_list = []
for day in range(number_of_days):
    a_date = (today + datetime.timedelta(days=day)).isoformat()
    date_list.append(a_date)

print(date_list[0])


# myObjects = [0, 2, 8, 7, 1, 4, 3, 21]

# myJson = {}
# tempDict = {}

# for anObject in myObjects:
#     tempDict['img'] = "img" + str(anObject)
#     myJson[anObject] = tempDict
#     tempDict = {}

#     print(myJson)

# x = range(0, 50)
# for n in x:
#     array = ["n, end = ', '"]
#     print(array)

# slotIds = list(range(1, 51))
# # print(slotIds)

# myJson = {}
# tempDict = {}

# for slotId in slotIds:
#     tempDict['slot'] = "slot" + "-" + str(slotId)
#     tempDict['available'] = False
#     myJson[slotId] = tempDict
#     tempDict = {}

#     array = len(myJson)

#     if array == 50:

#         print(myJson)

# class MyClass(object):
#     def __init__(self, number, slot):
#         self.number = number
#         self.slot = slot


# my_objects = []

# for i in range(10):
#     my_objects.append(MyClass(i))
#     my_objects.append(MyClass(slot[i]))

# # later

# for obj in my_objects:
#     print(obj.number)


# @route == description == register users
# @app.route('/users/register', methods=['POST', 'GET'])
# def register():
#     try:
#         username = request.get_json()['username']
#         email = request.get_json()['email']
#         phone_number = request.get_json()['phone_number']
#         password = request.get_json()['password']
#         confirm_password = request.get_json()['confirm_password']
#         result = ""

#         if password == confirm_password:
#             hashed_password = bcrypt.generate_password_hash(
#                 request.get_json()['password']).decode('utf-8')
#             confirm_hashed_password = bcrypt.generate_password_hash(
#                 request.get_json()['confirm_password']).decode('utf-8')

#             user = User(username=username, email=email, phone_number=phone_number,
#                         password=hashed_password, confirm_password=confirm_hashed_password)

#             db.session.add(user)
#             db.session.commit()

#             result = {
#                 'username': username,
#                 'email': email,
#                 'phone_number': phone_number,
#                 'password': hashed_password,
#             }

#             return {'result': result}, 201

#         else:
#             result = "Passwords do not match"
#             return {'password_match': result}, 401
#     except IntegrityError:
#         # the rollback func reverts the changes made to the db ( so if an error happens after we commited changes they will be reverted )
#         db.session.rollback()
#         return {"user_exist": "User already exists"}, 403
#     except AttributeError:
#         return 'Provide an Email and Password in JSON format in the request body', 400


# # @route == description == login users
# @app.route('/users/login', methods=['POST'])
# def login():
#     try:
#         email = request.get_json()['email']
#         password = request.get_json()['password']
#         result = ""

#         user = User.query.filter_by(email=email).first()

#         if user and bcrypt.check_password_hash(user.password, password):
#             access_token = create_access_token(identity={'username': user.username, 'email': user.email,
#                                                          'phone_number': user.phone_number,
#                                                          })

#             result = access_token
#             return {"access_token": result}, 201

#         else:
#             result = {"access_denied": "Invalid username or password"}
#             return result, 401
#     except AttributeError:
#         return 'Provide an Email and Password in JSON format in the request body', 400


# # @route == description == reservation info
# @app.route('/api/reservation', methods=['POST', 'GET'])
# def reservation():
#     try:

#         entry_date = request.get_json()['entry_date']
#         exit_date = request.get_json()['exit_date']
#         info = ""

#         user = User.query.filter_by(
#             username=username, phone_number=phone_number).first()

#         reservation = Reservations.query.first()

#         # === is not None === checks if data is in the database else it will error out Attribute error
#         if user:

#             reservations = Reservations(
#                 username=username, phone_number=phone_number, entry_date=entry_date, exit_date=exit_date, user_id=user.id)

#             db.session.add(reservations)
#             db.session.commit()

#             info = {
#                 "entry_date": entry_date,
#                 "exit_date": exit_date,
#             }
#             return {'info': info}, 201
#         else:
#             denied = {"access_denied": "Invalid username or phone number"}
#             return denied, 401
#     except AttributeError:
#         return 'Provide a username, phone_number, entry_date and exit_date in JSON format in the request body', 400
