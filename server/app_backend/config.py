import os
from app_backend import app

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///parking-reservation.db"
app.config['JWT_SECRET_KEY'] = 'SecretKey@2Muccinex@ParkingReservation'
app.config['CORS_HEADERS'] = 'Content-Type'
app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = os.environ.get('EMAIL_USER')
app.config['MAIL_PASSWORD'] = os.environ.get('EMAIL_PASS')
app.config['MPESA_PUBLIC_KEY'] = 'FLWPUBK_TEST-dd1a7775d3c151e60e9557778af1aee3-X'
app.config['MPESA_PRIVATE_KEY'] = 'FLWSECK_TEST-8993246f569c077a3f9a6faf5bd8c448-X'
app.config['WEBHOOK_VERIFY_TOKEN'] = 'verif-hash'
# app.config['SERVER_NAME'] = 'localhost:3000'
