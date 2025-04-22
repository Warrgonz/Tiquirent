from .seeder_roles import seed_roles
from .seeder_status import seed_estados
from .seeder_marcas import seed_marcas
from .seeder_tracciones import seed_tracciones
from .seeder_transmisiones import seed_transmisiones
from .seeder_nacionalidades import seed_nacionalidades
from .seeder_tipo_cedula import seed_tipos_cedula
from .seeder_ubicaciones import seed_ubicaciones
from .seeder_estado_reserva import seed_estados_reserva
from .seeder_vehiculos import seed_vehiculos


cli_seeders = [
    seed_roles,
    seed_estados,
    seed_marcas,
    seed_tracciones,
    seed_transmisiones,
    seed_nacionalidades,
    seed_tipos_cedula,
    seed_ubicaciones,
    seed_estados_reserva,
    seed_vehiculos
]
