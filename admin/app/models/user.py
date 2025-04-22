# models/user.py
from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, data):
        self.id = data.get("id")
        self.nombre_usuario = data.get("nombre_usuario")
        self.email = data.get("email")
        self.rol_id = data.get("rol_id")
        self.requiere_cambio = data.get("requiere_cambio", False)

    def get_id(self):
        return str(self.id)

    def to_dict(self):
        return {
            "id": self.id,
            "nombre_usuario": self.nombre_usuario,
            "email": self.email,
            "rol_id": self.rol_id,
            "requiere_cambio": self.requiere_cambio
        }
