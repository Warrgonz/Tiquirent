import os
from flask import Flask
from dotenv import load_dotenv
from app.routes import init_app  

load_dotenv()

def create_app():

    app = Flask(__name__)
    init_app(app) 

    return app