from flask.cli import with_appcontext
import click
from api.models.transmision import Transmision
from api.extensions import db

@click.command("seed-transmisiones")
@with_appcontext
def seed_transmisiones():
    """Comando para insertar tipos de transmisión si no existen"""
    transmisiones = ["Manual", "Automática", "CVT", "Semi-Automática"]

    for tipo in transmisiones:
        if Transmision.query.filter_by(tipo=tipo).first():
            click.echo(f"La transmisión '{tipo}' ya existe.")
        else:
            nueva_transmision = Transmision(tipo=tipo)
            db.session.add(nueva_transmision)
            click.echo(f"Transmisión '{tipo}' insertada.")

    db.session.commit()
