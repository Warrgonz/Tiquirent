from flask import Flask
import sentry_sdk
import os
from api.router import blueprints
from api.services.mySqlServices import init_db
from dotenv import load_dotenv
from .utils.errors import (
    handle_400, handle_403, handle_404, handle_500,
    handle_405, handle_401
)

load_dotenv()

def create_app():
    # Inicializar Sentry
    sentry_sdk.init(
        dsn= os.getenv('SENTRY_DNS'),
        send_default_pii=True,
        traces_sample_rate=1.0,
        _experiments={"continuous_profiling_auto_start": True},
    )

    app = Flask(__name__)

    # Inicializar Base de Datos
    init_db(app)

    # Registrar blueprints
    for blueprint in blueprints:
        app.register_blueprint(blueprint)

    # Esto son las respuestas globales de errores.
    app.register_error_handler(400, handle_400)
    app.register_error_handler(403, handle_403)
    app.register_error_handler(404, handle_404)
    app.register_error_handler(500, handle_500)
    app.register_error_handler(405, handle_405)
    app.register_error_handler(401, handle_401)

    return app
