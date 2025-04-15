# api/seeders/seeder_roles.py
from flask.cli import with_appcontext
import click
from api.models.role import Role
from api.services.mySqlServices import db

@click.command("seed-roles")  # Usá este decorador directamente
@with_appcontext
def seed_roles():
    """Comando para insertar roles 'admin' y 'colaborador' si no existen"""
    roles = [
        {'nombre': 'admin', 'descripcion': 'Rol de administrador con todos los permisos'},
        {'nombre': 'colaborador', 'descripcion': 'Rol con permisos limitados'}
    ]
    
    for role in roles:
        existing_role = Role.query.filter_by(nombre=role['nombre']).first()
        if existing_role:
            click.echo(f"El rol '{role['nombre']}' ya existe en la base de datos.")
        else:
            new_role = Role(nombre=role['nombre'], descripcion=role['descripcion'])
            db.session.add(new_role)
            db.session.commit()
            click.echo(f"Rol '{role['nombre']}' insertado con éxito.")
