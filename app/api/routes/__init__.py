# api/routes/__init__.py

from api.routes.users import blp as usuarios_blp

#from routes.auth import blp as auth_blp

# 🔁 Este arreglo se recorre desde create_app()
all_blueprints = [
    usuarios_blp,
#    auth_blp
]
