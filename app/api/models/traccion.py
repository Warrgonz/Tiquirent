from api.extensions import db

class Traccion(db.Model):
    __tablename__ = 'tracciones'

    id = db.Column(db.Integer, primary_key=True)
    tipo = db.Column(db.String(50), unique=True, nullable=False)