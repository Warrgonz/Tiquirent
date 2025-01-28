from config.database import db

class Role(db.Model):
    __tablename__ = "roles"

    id_rol = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50), unique=True, nullable=False) 

    # Relación con Users (se sincroniza con el backref en Users)
    users = db.relationship("Users", back_populates="role", lazy="dynamic")

    def __init__(self, name):
        self.name = name
