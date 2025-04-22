# api/seeders/seeder_tipo_cedula.py

from flask.cli import with_appcontext
import click
from api.models.tipo_cedula import TipoCedula
from api.services.mySqlServices import db

@click.command("seed-tipos-cedula")
@with_appcontext
def seed_tipos_cedula():
    """Comando para insertar tipos de cédula si no existen"""
    tipos = [
        'Nacional',
        'DIMEX',
        'Pasaporte'
    ]

    for tipo in tipos:
        existente = TipoCedula.query.filter_by(tipo_cedula=tipo).first()
        if existente:
            click.echo(f"⚠️ El tipo de cédula '{tipo}' ya existe.")
        else:
            nuevo_tipo = TipoCedula(tipo_cedula=tipo)
            db.session.add(nuevo_tipo)
            db.session.commit()
            click.echo(f"✅ Tipo de cédula '{tipo}' insertado correctamente.")
