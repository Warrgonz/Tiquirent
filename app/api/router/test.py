from flask import Blueprint, jsonify
from api.services.mySqlServices import db

inicio_bp = Blueprint('inicio', __name__)

@inicio_bp.route('/')
def inicio():
        
    result = "Hola"
    return jsonify({"message": result})



