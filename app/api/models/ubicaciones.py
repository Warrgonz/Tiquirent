from api.extensions import db

class Ubicaciones(db.Model):
    __tablename__ = 'ubicacion'

    id = db.Column(db.Integer, primary_key=True)
    ubicacion = db.Column(db.String(150), unique=True, nullable=False)
