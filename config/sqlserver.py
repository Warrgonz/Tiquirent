# Config/sqlserver

import os
from sqlalchemy import create_engine
from sqlalchemy.orm import scoped_session, sessionmaker
from sqlalchemy.ext.declarative import declarative_base
from dotenv import load_dotenv

load_dotenv()

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
        """Inicializar la conexión a la base de datos"""
        # Todas las configuraciones vienen directamente de las variables de entorno
        self.engine = create_engine(
            os.getenv('DATABASE_URL'),
            pool_size=int(os.getenv('SQLALCHEMY_POOL_SIZE')),
            max_overflow=int(os.getenv('SQLALCHEMY_MAX_OVERFLOW')),
            pool_timeout=int(os.getenv('SQLALCHEMY_POOL_TIMEOUT')),
            pool_recycle=int(os.getenv('SQLALCHEMY_POOL_RECYCLE')),
            echo=os.getenv('SQLALCHEMY_ECHO').lower() == 'true'
        )

        session_factory = sessionmaker(
            bind=self.engine,
            autocommit=False,
            autoflush=False
        )

        self.session = scoped_session(session_factory)
        Base.query = self.session.query_property()

    def get_session(self):
        if not self.session:
            raise RuntimeError("Database not initialized")
        return self.session

db = DatabaseConnection()