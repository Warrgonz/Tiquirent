# api/routes/__init__.py

from api.routes.users import blp as usuarios_blp
from api.routes.roles import blp as roles_blp


# 🔁 Este arreglo se recorre desde create_app()
all_blueprints = [
    usuarios_blp,
    roles_blp
]
