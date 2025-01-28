from app.models.users import Users
from app.models.roles import Role
from flask import Flask
import sentry_sdk
from sentry_sdk.integrations.flask import FlaskIntegration
from config.database import db, init_db
from dotenv import load_dotenv
import os
from app.api import init_app as init_blueprints
from app.utils.errors.error_handlers import register_error_handlers
from app.utils.db_monitor import DBMonitor
from flask_migrate import Migrate  
from flask_seeder import FlaskSeeder
from database.seeds.roles_seeder import RolesSeeder
from app.utils.prompts import init_prompts  # Importa la función init_prompts

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
            debug=False
        )
        print("Sentry configurado exitosamente")
        
    except Exception as e:
        print(f"Error configurando Sentry: {str(e)}")

    app = Flask(__name__)
    app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')

    # Inicializar DB con Flask-SQLAlchemy
    init_db(app)

    # Inicializar Flask-Migrate
    Migrate(app, db, directory="./database/migrations") 

    # Registrar blueprints y error handlers
    init_blueprints(app)
    register_error_handlers(app)

    # Inicializar Flask-Seeder
    seeder = FlaskSeeder()
    seeder.init_app(app, db)

    # Aquí se inicializan los comandos CLI dentro del contexto de la aplicación
    with app.app_context():  # Abrir contexto de la app
        init_prompts()  # Llamar a esta función para registrar los comandos

    return app