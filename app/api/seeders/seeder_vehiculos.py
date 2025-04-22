from flask.cli import with_appcontext
import click
from api.extensions import db
from api.models.vehicles import Vehiculo
import random
from datetime import datetime

@click.command("seed-vehiculos")
@with_appcontext
def seed_vehiculos():
    """Seeder para insertar 200 vehículos con datos diversos"""

    marcas_ids = [1, 2, 3, 4, 5, 6, 7, 8]  # Toyota, Honda, Hyundai, etc.
    transmisiones_ids = [1, 2, 3, 4]       # Manual, Automática, CVT, Semi-Automática
    tracciones_ids = [1, 2, 3, 4, 5]       # 4x2, 4x4, AWD, FWD, RWD
    estados_ids = [1]                     # Asumimos 1 = Disponible
    ruta_imagen = "vehicles/124536/1.jpg"

    modelos = [
        "Corolla", "Civic", "Elantra", "Versa", "Swift", "Lancer", "Mazda3", "Aveo",
        "Yaris", "CR-V", "Tucson", "Altima", "Vitara", "Outlander", "CX-5", "Tracker"
    ]

    colores = ["Rojo", "Azul", "Negro", "Blanco", "Gris", "Plata", "Verde", "Amarillo"]

    for i in range(200):
        marca_id = random.choice(marcas_ids)
        transmision_id = random.choice(transmisiones_ids)
        traccion_id = random.choice(tracciones_ids)
        estado_id = random.choice(estados_ids)

        modelo = random.choice(modelos)
        año = random.randint(2015, 2024)
        placa = f"PLT-{i:04d}-{random.randint(100, 999)}"
        color = random.choice(colores)
        precio_diario = round(random.uniform(35.0, 150.0), 2)

        puertas = random.choice([2, 4, 5])
        numero_asientos = random.choice([2, 4, 5, 7])

        asin = f"ASIN-{i+1000}"

        vehiculo = Vehiculo(
            asin=asin,
            modelo=modelo,
            año=año,
            placa=placa,
            color=color,
            ruta_imagen=ruta_imagen,
            precio_diario=precio_diario,
            puertas=puertas,
            numero_asientos=numero_asientos,
            marca_id=marca_id,
            transmision_id=transmision_id,
            traccion_id=traccion_id,
            estado_id=estado_id
        )

        db.session.add(vehiculo)

    db.session.commit()
    click.echo("✅ Se insertaron 200 vehículos de prueba exitosamente.")
