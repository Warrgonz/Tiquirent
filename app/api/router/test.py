from flask import Blueprint, jsonify
from api.services.mySqlServices import db
from api.decorators.auth import require_api_key

inicio_bp = Blueprint('inicio', __name__)

@inicio_bp.route('/')
@require_api_key
def inicio():
        
    result = "Hola"
    return jsonify({"message": result})



