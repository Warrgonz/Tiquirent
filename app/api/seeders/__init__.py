from .seeder_roles import seed_roles
from .seeder_status import seed_estados
from .seeder_marcas import seed_marcas
from .seeder_tracciones import seed_tracciones
from .seeder_transmisiones import seed_transmisiones

cli_seeders = [
    seed_roles,
    seed_estados,
    seed_marcas,
    seed_tracciones,
    seed_transmisiones
]
