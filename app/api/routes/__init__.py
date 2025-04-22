# api/routes/__init__.py

from api.routes.users import blp as usuarios_blp
from api.routes.roles import blp as roles_blp
from api.routes.login import blp as login_blp
from api.routes.vehicles import blp as vehicles_blp
from api.routes.catalogo import blp as vehicles_catalog_blp


# 🔁 Este arreglo se recorre desde create_app()
all_blueprints = [
    usuarios_blp,
    roles_blp,
    login_blp,
    vehicles_blp,
    vehicles_catalog_blp
]
