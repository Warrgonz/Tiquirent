# __init__.py

from flask import Flask
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration
from config.database import db, init_db
from dotenv import load_dotenv
from sqlalchemy import text, inspect
import os
from app.api import init_app as init_blueprints
from app.utils.error_handlers import register_error_handlers
from app.utils.db_monitor import DBMonitor
from app.models.users import Users  # Importar el modelo Users

load_dotenv()

def create_app():
    if not DBMonitor.check_aws_credentials():
        print("AWS credentials not found or invalid")

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
    
    # Inicializar DB con Flask-SQLAlchemy
    init_db(app)

    # Registrar blueprints y error handlers
    init_blueprints(app)
    register_error_handlers(app)

    @app.cli.command("test-db")
    def test_db():
        """Probar la conexión a la base de datos"""
        try:
            # Usando Flask-SQLAlchemy
            result = db.session.execute(text("SELECT @@VERSION")).scalar()
            print("✅ Conexión exitosa!")
            print(f"Versión de SQL Server: {result}")
        except Exception as e:
            print("❌ Error de conexión!")
            print(f"Error: {str(e)}")
        finally:
            db.session.close()

    @app.cli.command("show-tables")
    def show_tables():
        """Mostrar todas las tablas en la base de datos"""
        try:
            inspector = inspect(db.engine)
            tables = inspector.get_table_names()
            
            if tables:
                print("\nTablas en la base de datos:")
                for table in tables:
                    print(f"\n📋 Tabla: {table}")
                    columns = inspector.get_columns(table)
                    for column in columns:
                        print(f"  ├── {column['name']}")
                        print(f"  │   └── Tipo: {column['type']}")
            else:
                print("\n⚠️ No se encontraron tablas en la base de datos.")
                
        except Exception as e:
            print(f"\n❌ Error: {str(e)}")

    @app.cli.command("list-models")
    def list_models():
        """Listar todos los modelos registrados en SQLAlchemy"""
        print("\nModelos registrados en SQLAlchemy:")
        for model in db.Model.__subclasses__():
            print(f"- {model.__name__}")

    return app
