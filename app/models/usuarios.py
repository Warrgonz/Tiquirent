# app/models/users.py
from config.database import db
from datetime import datetime

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    cedula = db.Column(db.String(255), unique=True, nullable=False)
    nombre_usuario = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    contrasena = db.Column(db.String(255), nullable=False)  # Guardar en hash
    contrasena_temp = db.Column(db.String(255))
    rol_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    fecha_creacion = db.Column(db.TIMESTAMP, server_default=db.func.current_timestamp())
    estado = db.Column(db.Enum('activo', 'inactivo'), default='activo')
    ruta_imagen = db.Column(db.String(255))

    rol = db.relationship('Rol', backref=db.backref('usuarios', lazy=True))