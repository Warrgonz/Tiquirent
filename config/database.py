from flask_sqlalchemy import SQLAlchemy
from app.services.aws_service import AWSService
import os

db = SQLAlchemy()

def init_db(app):
    try:
        # Get credentials from AWS Secrets Manager
        db_credentials = AWSService.get_secret()
        
        # Build connection string
        DATABASE_URL = (
            f"mysql+pymysql://{db_credentials.get('username')}:{db_credentials.get('password')}"
            f"@{os.getenv('DB_HOST')}:{os.getenv('DB_PORT', 3306)}/{os.getenv('DB_NAME')}"
        )

        # Configure SQLAlchemy
        app.config['SQLALCHEMY_DATABASE_URI'] = DATABASE_URL
        app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
        app.config['SQLALCHEMY_POOL_SIZE'] = int(os.getenv('SQLALCHEMY_POOL_SIZE', 10))
        app.config['SQLALCHEMY_MAX_OVERFLOW'] = int(os.getenv('SQLALCHEMY_MAX_OVERFLOW', 20))
        
        # Initialize database
        db.init_app(app)

        # Create tables
        with app.app_context():
            db.create_all()

    except Exception as e:
        print(f"❌ Error initializing database: {str(e)}")
        raise