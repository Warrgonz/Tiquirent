# app/models/users.py
from config.database import db
from datetime import datetime

class Users(db.Model):
    __tablename__ = 'Users'
    
    id_user = db.Column(db.Integer, primary_key=True, autoincrement=True)
    creation_date = db.Column(db.DateTime, default=datetime.utcnow)