# api/models/estado.py
from api.extensions import db

class Status(db.Model):
    __tablename__ = 'estados'

    id = db.Column(db.Integer, primary_key=True)  # ← corregido: era id_estado
    estado = db.Column(db.String(50), unique=True, nullable=False)


