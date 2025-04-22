from api.extensions import db

class Transmision(db.Model):
    __tablename__ = 'transmisiones'

    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(50), unique=True, nullable=False)
