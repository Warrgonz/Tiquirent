from flask_seeder import Seeder
from app.models.roles import Role
from config.database import db 

class RolesSeeder(Seeder):
    def __init__(self, db=None):
        super().__init__()
        self.db = db or db  

    def run(self):
        # Definir los roles que quieres insertar
        roles = [
            {"name": "Admin"},
            {"name": "Assist"}
        ]

        # Insertar los roles en la base de datos
        for role_data in roles:
            role = Role(name=role_data["name"])
            db.session.add(role) 
            print(f"Adding role: {role.name}")

        # Guardar los cambios en la base de datos
        db.session.commit()
