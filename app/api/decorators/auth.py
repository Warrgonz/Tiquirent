from flask import request, current_app, jsonify
from functools import wraps
from api.utils.config import Keys

# Este decorador esta hecho para que cuando alguien se quiera conectar al proyecto, tenga que usar el API Key.
def require_api_key(f):
    @wraps(f)
    def decorated_function(*args, **kwargs):
        key = request.headers.get('X-API-Key')
        print("API_KEY esperada:", Keys.API_KEY)  
        if not key or key != Keys.API_KEY:
            return jsonify({"error": "Unauthorized"}), 401
        return f(*args, **kwargs)
    return decorated_function
