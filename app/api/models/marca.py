from api.extensions import db

class Marca(db.Model):
    __tablename__ = 'marcas'

    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(50), unique=True, nullable=False)
