from flask.cli import with_appcontext
import click
from api.models.nacionalidad import Nacionalidad
from api.services.mySqlServices import db

@click.command("seed-nacionalidades")  # Comando que podés correr con flask
@with_appcontext
def seed_nacionalidades():
    """Inserta una lista de países como nacionalidades si no existen"""
    nacionalidades = [
        'Demacia', 'Noxus', 'Freljord', 'Piltover', 'Zaun', 'Ionia', 'Shurima', 'Islas de la Sombra', 'Aguas Estancadas', 'Targon', 'Void', 'Bandle', 'Ixtal', 'Camavor'
    
    ]

    for pais in nacionalidades:
        existente = Nacionalidad.query.filter_by(pais=pais).first()
        if existente:
            click.echo(f"La nacionalidad '{pais}' ya existe.")
        else:
            nueva = Nacionalidad(pais=pais)
            db.session.add(nueva)
            click.echo(f"✅ Nacionalidad '{pais}' insertada.")

    db.session.commit()
