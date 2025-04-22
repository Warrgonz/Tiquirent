# api/seeders/seeder_estado_reserva.py

from flask.cli import with_appcontext
import click
from api.models.estado_reserva import EstadoReserva
from api.services.mySqlServices import db

@click.command("seed-estados-reserva")
@with_appcontext
def seed_estados_reserva():
    """Comando para insertar estados de reserva si no existen"""
    estados = ['Creado', 'En progreso', 'Finalizado', 'Cancelada']

    for nombre_estado in estados:
        existente = EstadoReserva.query.filter_by(estado=nombre_estado).first()
        if existente:
            click.echo(f"⚠️ El estado '{nombre_estado}' ya existe.")
        else:
            nuevo_estado = EstadoReserva(estado=nombre_estado)
            db.session.add(nuevo_estado)
            db.session.commit()
            click.echo(f"✅ Estado '{nombre_estado}' insertado correctamente.")
