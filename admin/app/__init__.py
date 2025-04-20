import os
from flask import Flask
from dotenv import load_dotenv
from app.routes import init_app  

load_dotenv()

def create_app():

    app = Flask(__name__, static_folder='static')
    init_app(app) 

    app.secret_key = os.getenv("FLASK_SECRET_KEY")

    return app