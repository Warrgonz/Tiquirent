from flask import Flask
from dotenv import load_dotenv
from api.router import blueprints
import sentry_sdk

load_dotenv()

def create_app():
    # Inicializar Sentry antes de cualquier cosa
    sentry_sdk.init(
        dsn="https://be02acbeea2274abb7c01bdaee13a96f@o4508662649913344.ingest.us.sentry.io/4509061964169216",
        send_default_pii=True,  # Incluir información personal
        traces_sample_rate=1.0,  # Capturar todas las transacciones
        _experiments={
            "continuous_profiling_auto_start": True
        },
    )

    app = Flask(__name__)

    # Registrar los blueprints
    for blueprint in blueprints:
        app.register_blueprint(blueprint)

    return app
