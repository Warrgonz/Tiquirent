import os
from flask import Flask, session
from dotenv import load_dotenv
from app.routes import init_app  
from .extensions import login_manager
from app.models.user import User
from datetime import timedelta


load_dotenv()

def create_app():
    app = Flask(__name__, static_folder='static')

    # Configurar Login Manager
    login_manager.init_app(app) 
    login_manager.login_view = "signIn.inicio"

    @login_manager.user_loader
    def load_user(user_id):
        from app.services.http_client import APIClient
        api_client = APIClient()

        user_data = session.get("user_data")
        if user_data and str(user_data.get("id")) == str(user_id):
            print("🔁 Usuario cargado desde sesión")
            return User(user_data)

        print("🧠 Usuario cargado desde cookie remember")
        res = api_client.get(f"/login/users/{user_id}")
        if isinstance(res, dict) and res.get("id"):
            session["user_data"] = res
            return User(res)

        print("❌ Usuario no autenticado")
        return None


    # Clave secreta para sesiones
    app.secret_key = os.getenv("FLASK_SECRET_KEY")

    # Inicializar rutas
    init_app(app)

    app.config["REMEMBER_COOKIE_DURATION"] = timedelta(days=30)
    app.config["REMEMBER_COOKIE_HTTPONLY"] = True
    app.config["REMEMBER_COOKIE_SECURE"] = False 

    return app
