from flask.cli import with_appcontext
import click
from api.models.marca import Marca
from api.extensions import db

@click.command("seed-marcas")
@with_appcontext
def seed_marcas():
    """Comando para insertar marcas predefinidas si no existen"""
    marcas = ["Toyota", "Honda", "Hyundai", "Nissan", "Suzuki", "Mitsubishi", "Mazda", "Chevrolet"]

    for nombre in marcas:
        if Marca.query.filter_by(nombre=nombre).first():
            click.echo(f"La marca '{nombre}' ya existe.")
        else:
            nueva_marca = Marca(nombre=nombre)
            db.session.add(nueva_marca)
            click.echo(f"Marca '{nombre}' insertada.")

    db.session.commit()
