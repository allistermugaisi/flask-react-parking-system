from datetime import datetime
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from app_backend import app, db, ma


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    admin = db.Column(db.Boolean, nullable=False)
    public_id = db.Column(db.String(50), unique=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_number = db.Column(db.Integer, unique=True, nullable=False)
    password = db.Column(db.String(80), nullable=False)
    confirm_password = db.Column(db.String(80), nullable=False)
    date_created = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    reservations = db.relationship(
        'Reservations', backref='owner', lazy=True)

    def get_reset_token(self, expires_sec=1800):
        s = Serializer(app.config['JWT_SECRET_KEY'], expires_sec)
        return s.dumps({'public_id': self.public_id}).decode('utf-8')

    @staticmethod
    def verify_reset_token(token):
        s = Serializer(app.config['JWT_SECRET_KEY'])
        try:
            user_id = s.loads(token)['public_id']
        except:
            return None
        return Users.query.get(user_id)

    def __repr__(self):
        return f"User('{self.public_id}','{self.admin}','{self.username}', '{self.email}', '{self.phone_number}', '{self.date_created}')"


class UsersSchema(ma.Schema):
    class Meta:
        fields = ('public_id', 'admin', 'username',
                  'email', 'phone_number', 'date_created')


class Reservations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    public_reservation_id = db.Column(db.String(50), unique=True)
    reserved_date = db.Column(db.String, nullable=False)
    complete = db.Column(db.Boolean, nullable=False)
    slot_number = db.Column(db.String, nullable=False)
    zone = db.Column(db.String(70), nullable=False)
    cost = db.Column(db.Integer, nullable=False)
    reserved_slot = db.Column(db.String(70), nullable=False)
    date_created = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f"Reservations('{self.public_reservation_id}','{self.reserved_date}','{self.zone}','{self.cost}','{self.reserved_slot}','{self.date_created}','{self.complete}','{self.user_id}')"


class ReservationsSchema(ma.Schema):
    class Meta:
        fields = ('public_reservation_id', 'reserved_date', 'zone', 'slot_number',
                  'cost', 'reserved_slot', 'complete', 'date_created')


class Slots(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    slot_name = db.Column(db.String(70), nullable=False)
    zone = db.Column(db.String(70), nullable=False)

    def __repr__(self):
        return f"Slots('{self.id}','{self.slot_name}','{self.zone}')"


class SlotsSchema(ma.Schema):
    class Meta:
        fields = ('id', 'slot_name', 'zone')
