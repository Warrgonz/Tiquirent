# services/mySqlServices.py

from flask import Flask
from api.extensions import db 
import sentry_sdk
import os
from dotenv import load_dotenv

load_dotenv()

def init_db(app: Flask):
    try:
        app.config["SQLALCHEMY_DATABASE_URI"] = (
            f"mysql+pymysql://{os.getenv('MYSQL_USER')}:{os.getenv('MYSQL_PASSWORD')}"
            f"@{os.getenv('MYSQL_HOST')}:{os.getenv('MYSQL_PORT')}/{os.getenv('MYSQL_DATABASE')}"
        )
        app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

        db.init_app(app)

    except Exception as e:
        sentry_sdk.capture_exception(e)
        print(f"❌ Error conectando a MySQL: {e}")
        raise
