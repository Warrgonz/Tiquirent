from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class TipoIdentificacion(db.Model):
    __tablename__ = 'tipos_identificacion'
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), unique=True, nullable=False)
