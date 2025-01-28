# app/models/users.py
from config.database import db
from datetime import datetime

class Users(db.Model):
    __tablename__ = "users"

    id_user = db.Column(db.Integer, primary_key=True, autoincrement=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    email = db.Column(db.String(255), unique=True, nullable=False)
    name = db.Column(db.String(255))
    password = db.Column(db.String(255))
    temp_password = db.Column(db.String(255))
    first_name = db.Column(db.String(255))
    last_name = db.Column(db.String(255))
    second_last_name = db.Column(db.String(255))
    status = db.Column(db.Boolean, default=False)
    img_route = db.Column(db.String(255))
    creation_date = db.Column(db.DateTime, default=datetime.utcnow)

    # Foreign Key: Hace referencia a "roles.id_rol" (tabla.columna)
    id_rol = db.Column(db.Integer, db.ForeignKey("roles.id_rol"))

    # Relación: Usar back_populates para sincronización bidireccional
    role = db.relationship("Role", back_populates="users", lazy=True)

    