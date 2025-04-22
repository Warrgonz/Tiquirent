from api.extensions import db

class Nacionalidad(db.Model):
    __tablename__ = 'nacionalidad'

    id = db.Column(db.Integer, primary_key=True)
    pais = db.Column(db.String(150), unique=True, nullable=False)
