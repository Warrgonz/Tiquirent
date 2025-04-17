# app/__init__.py

from flask import Flask
from api.extensions import db, api, cors  
import sentry_sdk
import os
from dotenv import load_dotenv
from .routes import all_blueprints     
from api.services.mySqlServices import init_db
from api.seeders import cli_seeders
from .utils.errors import (
    handle_400, handle_403, handle_404, handle_500,
    handle_405, handle_401
)
from flask_swagger_ui import get_swaggerui_blueprint

load_dotenv()

def create_app():
    sentry_sdk.init(
        dsn=os.getenv('SENTRY_DNS'),
        send_default_pii=True,
        traces_sample_rate=1.0,
        _experiments={"continuous_profiling_auto_start": True},
    )

    app = Flask(__name__)

    # 📦 Configuración base
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config["API_TITLE"] = "API Tiquirent"
    app.config["API_VERSION"] = "v1"
    app.config["OPENAPI_VERSION"] = "3.0.3"
    app.config["OPENAPI_URL_PREFIX"] = "/"
    app.config["OPENAPI_SWAGGER_UI_PATH"] = "/"
    app.config["OPENAPI_SWAGGER_UI_URL"] = "https://cdn.jsdelivr.net/npm/swagger-ui-dist/"

    app.config["API_SPEC_OPTIONS"] = {
    "components": {
        "securitySchemes": {
            "ApiKeyAuth": {
                "type": "apiKey",
                "in": "header",
                "name": "X-API-Key"
                }
            }
        },
        "security": [{"ApiKeyAuth": []}]
    }


    # 🔧 Inicializar extensiones
    init_db(app)
    cors.init_app(app)

    api.init_app(app)  

    # 🧩 Registrar todos los blueprints antes de iniciar `api`
    for blueprint in all_blueprints:
        api.register_blueprint(blueprint)

    # 🧪 Crear tablas
    with app.app_context():
        db.create_all()

    # 🌱 Seeders CLI
    for command in cli_seeders:
        app.cli.add_command(command)

    # 🚨 Manejo de errores global
    app.register_error_handler(400, handle_400)
    app.register_error_handler(403, handle_403)
    app.register_error_handler(404, handle_404)
    app.register_error_handler(500, handle_500)
    app.register_error_handler(405, handle_405)
    app.register_error_handler(401, handle_401)

    return app
