from flask import Blueprint, jsonify
from api.services.mySqlServices import db
from api.decorators.auth import require_api_key
from controller.auth import authUser

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/login', methods=['POST'])
@require_api_key
def login():


    #authUser()
 
    # setCookie()       
    result = "Hola"
    return jsonify({"message": result})