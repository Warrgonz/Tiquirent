# models/user.py
from flask_login import UserMixin

class User(UserMixin):
    def __init__(self, data):
        self.id = data.get("id")
        self.cedula = data.get("cedula")
        self.nombre_usuario = data.get("nombre_usuario")
        self.email = data.get("email")
        self.rol_id = data.get("rol_id")  # opcional si querés seguir usando IDs
        self.estado_id = data.get("estado_id")
        self.requiere_cambio = data.get("requiere_cambio", False)
        self.ruta_imagen = data.get("ruta_imagen")
        self.rol = data.get("rol", {})  # <- nuevo
        self.estado = data.get("estado", {})  # <- nuevo

    def to_dict(self):
        return {
            "id": self.id,
            "cedula": self.cedula,
            "nombre_usuario": self.nombre_usuario,
            "email": self.email,
            "rol_id": self.rol_id,
            "estado_id": self.estado_id,
            "requiere_cambio": self.requiere_cambio,
            "ruta_imagen": self.ruta_imagen,
            "rol": self.rol,
            "estado": self.estado
        }

