from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Usuario(db.Model):
    __tablename__ = 'usuarios'
    id = db.Column(db.Integer, primary_key=True)
    cedula = db.Column(db.String(255), unique=True, nullable=False)
    nombre_usuario = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    contrasena = db.Column(db.String(255), nullable=False)
    contrasena_temp = db.Column(db.String(255))
    rol_id = db.Column(db.Integer, db.ForeignKey('roles.id'))
    fecha_creacion = db.Column(db.TIMESTAMP, default=db.func.current_timestamp())
    estado_id = db.Column(db.Integer, db.ForeignKey('estados.id'))
    ruta_imagen = db.Column(db.String(255))
