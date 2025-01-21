# __init__.py

from flask import Flask
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration
from config.sqlserver import db
from dotenv import load_dotenv
from sqlalchemy import text 
import os
from app.api import init_app as init_blueprints
from app.utils.error_handlers import register_error_handlers

load_dotenv()

def create_app():

    # Inicializar Sentry antes de crear la app
    try:
        dsn = os.getenv('SENTRY_DSN')
        if not dsn:
            print("¡Advertencia! SENTRY_DSN no está configurado en .env")
            return
            
        print(f"Configurando Sentry con DSN: {dsn}")
        
        sentry_sdk.init(
            dsn=dsn,
            integrations=[FlaskIntegration()],
            traces_sample_rate=1.0,
            environment=os.getenv('FLASK_ENV', 'development'),
            debug=True  # Para ver más información de debug
        )
        print("Sentry configurado exitosamente")
        
    except Exception as e:
        print(f"Error configurando Sentry: {str(e)}")

    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
    db.init_app(app)

    init_blueprints(app)

    register_error_handlers(app)

    @app.cli.command("test-db")
    def test_db():
        """Probar la conexión a la base de datos"""
        try:
            session = db.get_session()
            result = session.execute(text("SELECT @@VERSION")).scalar()
            print("✅ Conexión exitosa!")
            print(f"Versión de SQL Server: {result}")
        except Exception as e:
            print("❌ Error de conexión!")
            print(f"Error: {str(e)}")
        finally:
            session.close()

    return app
