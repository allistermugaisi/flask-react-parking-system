from datetime import datetime
from itsdangerous import TimedJSONWebSignatureSerializer as Serializer
from app_backend import app, db, ma


class Users(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    admin = db.Column(db.Boolean)
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
    entry_date = db.Column(db.String, nullable=False)
    exit_date = db.Column(db.String, nullable=False)
    complete = db.Column(db.Boolean)
    date_created = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    def __repr__(self):
        return f"Reservations('{self.public_reservation_id}','{self.entry_date}','{self.exit_date}','{self.date_created}','{self.complete}')"


class ReservationsSchema(ma.Schema):
    class Meta:
        fields = ('entry_date', 'exit_date', 'complete', 'date_created')


class Zones(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    slot_name = db.Column(db.String(70), nullable=False)
    zone = db.Column(db.String(70), nullable=False)
    available = db.Column(db.Boolean)

    def __repr__(self):
        return f"Zones('{self.available}','{self.slot_name}','{self.zone}')"


class ZonesSchema(ma.Schema):
    class Meta:
        fields = ('available', 'slot_name', 'zone')
