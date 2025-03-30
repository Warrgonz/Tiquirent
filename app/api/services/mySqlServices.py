from flask_sqlalchemy import SQLAlchemy
from flask import Flask
import sentry_sdk
from dotenv import load_dotenv
import os

load_dotenv()

db = SQLAlchemy()

def init_db(app: Flask):
    try:
        app.config["SQLALCHEMY_DATABASE_URI"] = (
            f"mysql+pymysql://{os.getenv('MYSQL_USER')}:{os.getenv('MYSQL_PASSWORD')}"
            f"@{os.getenv('MYSQL_HOST')}:{os.getenv('MYSQL_PORT')}/{os.getenv('MYSQL_DATABASE')}"
        )
        app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

        db.init_app(app)

        # Probar conexión
        with app.app_context():
            db.engine.connect()
            print("✅ Conexión exitosa a MySQL con SQLAlchemy")

    except Exception as e:
        sentry_sdk.capture_exception(e)
        print(f"❌ Error conectando a MySQL: {e}")
        raise
