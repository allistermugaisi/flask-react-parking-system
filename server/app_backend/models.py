from datetime import datetime
from app_backend import db, ma


class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    phone_number = db.Column(db.Integer, unique=True, nullable=False)
    password = db.Column(db.String(60), nullable=False)
    confirm_password = db.Column(db.String(60), nullable=False)
    date_created = db.Column(
        db.DateTime, nullable=False, default=datetime.utcnow)
    reservations = db.relationship(
        'Reservations', backref='user', lazy=True)

    def __repr__(self):
        return f"User('{self.username}', '{self.email}', '{self.phone_number}', '{self.date_created}')"


class UserSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'email', 'phone_number')


class Reservations(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(50), nullable=False)
    phone_number = db.Column(db.Integer, nullable=False)
    entry_date = db.Column(db.String, nullable=False)
    exit_date = db.Column(db.String, nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)

    def __repr__(self):
        return f"Reservations('{self.username}', '{self.phone_number}','{self.entry_date}','{self.exit_date}')"


class ReservationsSchema(ma.Schema):
    class Meta:
        fields = ('id', 'username', 'phone_number',
                  'entry_date', 'exit_date', 'user_id')


class Zones(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    capacity = db.Column(db.Integer, nullable=False)
    slot = db.Column(db.Integer, nullable=False)
    zone = db.Column(db.String(70), nullable=False)

    def __repr__(self):
        return f"Zones('{self.id}','{self.capacity}','{self.slot}','{self.zone}')"


class ZonesSchema(ma.Schema):
    class Meta:
        fields = ('id', 'capacity', 'slot', 'zone')
