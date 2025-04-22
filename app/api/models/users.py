from datetime import datetime
from api.extensions import db

class Users(db.Model):
    __tablename__ = 'usuarios'

    id = db.Column(db.Integer, primary_key=True, autoincrement=True) 
    cedula = db.Column(db.String(255), unique=True, nullable=False)
    nombre_usuario = db.Column(db.String(50), nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    contrasena = db.Column(db.String(255), nullable=False)
    contrasena_temp = db.Column(db.String(255))

    rol_id = db.Column(db.Integer, db.ForeignKey('roles.id'))           
    estado_id = db.Column(db.Integer, db.ForeignKey('estados.id'))      

    fecha_creacion = db.Column(db.DateTime, default=datetime.utcnow)
    ruta_imagen = db.Column(db.String(255))

    # Relaciones
    rol = db.relationship('Role', backref=db.backref('usuarios', lazy=True))
    estado = db.relationship('Status', backref=db.backref('usuarios', lazy=True)) 

