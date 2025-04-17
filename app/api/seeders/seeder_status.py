# api/seeders/seeder_estados.py
from flask.cli import with_appcontext
import click
from api.models.status import Status 
from api.services.mySqlServices import db

@click.command("seed-estados")  # Comando que puedes ejecutar con flask
@with_appcontext
def seed_estados():
    """Comando para insertar estados básicos si no existen"""
    estados = [
        {'estado': 'activo'},
        {'estado': 'inactivo'}
    ]

    for est in estados:
        existing_estado = Status.query.filter_by(estado=est['estado']).first()
        if existing_estado:
            click.echo(f"El estado '{est['estado']}' ya existe en la base de datos.")
        else:
            new_estado = Status(estado=est['estado'])
            db.session.add(new_estado)
            db.session.commit()
            click.echo(f"Estado '{est['estado']}' insertado con éxito.")
