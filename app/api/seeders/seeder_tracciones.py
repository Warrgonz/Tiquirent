from flask.cli import with_appcontext
import click
from api.models.traccion import Traccion
from api.extensions import db

@click.command("seed-tracciones")
@with_appcontext
def seed_tracciones():
    """Comando para insertar tipos de tracción amigables para el usuario"""
    tracciones = [
        "4x2 – Tracción simple (2 ruedas)",
        "4x4 – Tracción total manual",
        "AWD – Tracción total automática",
        "FWD – Tracción delantera",
        "RWD – Tracción trasera"
    ]

    for tipo in tracciones:
        if Traccion.query.filter_by(tipo=tipo).first():
            click.echo(f"La tracción '{tipo}' ya existe.")
        else:
            nueva_traccion = Traccion(tipo=tipo)
            db.session.add(nueva_traccion)
            click.echo(f"Tracción '{tipo}' insertada.")

    db.session.commit()
