from api.extensions import db

class TipoCedula(db.Model):
    __tablename__ = 'tipo_cedula'

    id = db.Column(db.Integer, primary_key=True)
    tipo_cedula = db.Column(db.String(150), unique=True, nullable=False)
