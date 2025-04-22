# api/seeders/seeder_ubicaciones.py

from flask.cli import with_appcontext
import click
from api.models.ubicaciones import Ubicaciones
from api.services.mySqlServices import db

@click.command("seed-ubicaciones")
@with_appcontext
def seed_ubicaciones():
    """Comando para insertar sucursales por provincia si no existen"""
    sucursales = [
        'Sucursal San José',
        'Sucursal Alajuela',
        'Sucursal Cartago',
        'Sucursal Heredia',
        'Sucursal Puntarenas',
        'Sucursal Limón',
        'Sucursal Guanacaste',
    ]

    for nombre in sucursales:
        existente = Ubicaciones.query.filter_by(ubicacion=nombre).first()
        if existente:
            click.echo(f"⚠️ La ubicación '{nombre}' ya existe.")
        else:
            nueva = Ubicaciones(ubicacion=nombre)
            db.session.add(nueva)
            db.session.commit()
            click.echo(f"✅ Ubicación '{nombre}' insertada correctamente.")
