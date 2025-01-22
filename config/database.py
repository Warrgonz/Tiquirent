from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker, declarative_base
import os
from app.services.aws_service import AWSService

Base = declarative_base()

class DatabaseConnection:
    _instance = None
    
    def __new__(cls):
        if cls._instance is None:
            cls._instance = super(DatabaseConnection, cls).__new__(cls)
            cls._instance._initialized = False
        return cls._instance

    def __init__(self):
        if self._initialized:
            return
            
        self._initialized = True
        self.engine = None
        self.session = None

    def init_app(self, app):
        try:
            # Get credentials from AWS Secrets Manager
            db_credentials = AWSService.get_secret()
            
            # Combine AWS secrets with environment variables
            db_config = {
                'username': db_credentials.get('username'),
                'password': db_credentials.get('password'),
                'host': os.getenv('DB_HOST'),
                'port': os.getenv('DB_PORT', 3306),
                'dbname': os.getenv('DB_NAME')
            }

            # Build connection string
            DATABASE_URL = (
                f"mysql+pymysql://{db_config['username']}:{db_config['password']}"
                f"@{db_config['host']}:{db_config['port']}/{db_config['dbname']}"
            )

            # Create engine
            self.engine = create_engine(
                DATABASE_URL,
                pool_size=int(os.getenv('SQLALCHEMY_POOL_SIZE', 10)),
                max_overflow=int(os.getenv('SQLALCHEMY_MAX_OVERFLOW', 20)),
                pool_timeout=int(os.getenv('SQLALCHEMY_POOL_TIMEOUT', 30)),
                pool_recycle=int(os.getenv('SQLALCHEMY_POOL_RECYCLE', 1800))
            )

            # Create session factory
            session_factory = sessionmaker(bind=self.engine)
            self.session = scoped_session(session_factory)

            # Crear tablas
            with app.app_context():
                Base.metadata.create_all(bind=self.engine)
                print("✅ Database initialized successfully!")

            return app

        except Exception as e:
            print(f"❌ Error initializing database: {str(e)}")
            raise

    def get_session(self):
        """Obtener una sesión de base de datos"""
        if not self.session:
            raise RuntimeError("Database not initialized")
        return self.session

# Crear instancia que será importada
db = DatabaseConnection()