from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Reservacion(db.Model):
    __tablename__ = 'reservaciones'
    id = db.Column(db.Integer, primary_key=True)
    codigo_reserva = db.Column(db.String(50), unique=True, nullable=False)
    codigo_qr = db.Column(db.Text)
    nombre = db.Column(db.String(100), nullable=False)
    nacionalidad = db.Column(db.String(50), nullable=False)
    tipo_id = db.Column(db.Integer, db.ForeignKey('tipos_identificacion.id'), nullable=False)
    numero_identificacion = db.Column(db.String(50), unique=True, nullable=False)
    email = db.Column(db.String(100), unique=True, nullable=False)
    telefono = db.Column(db.String(20), nullable=False)
    numero_licencia = db.Column(db.String(50), unique=True, nullable=False)
    ubicacion_recogida = db.Column(db.String(100), nullable=False)
    ubicacion_entrega = db.Column(db.String(100), nullable=False)
    fecha_inicio = db.Column(db.Date, nullable=False)
    fecha_fin = db.Column(db.Date, nullable=False)
    id_estado_reserva = db.Column(db.Integer, db.ForeignKey('estados_reserva.id'), nullable=False)
    id_aprobador = db.Column(db.Integer, db.ForeignKey('usuarios.id'))
    id_vehiculo = db.Column(db.Integer, db.ForeignKey('vehiculos.id'), nullable=False)
