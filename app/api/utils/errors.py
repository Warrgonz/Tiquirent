# app/utils/errors.py

from flask import jsonify

# Error 400 - Bad Request (Solicitud incorrecta)
def handle_400(error):
    response = jsonify({
        'error': 'Solicitud incorrecta',
        'message': str(error)
    })
    response.status_code = 400
    return response

# Error 403 - Forbidden (Prohibido)
def handle_403(error):
    response = jsonify({
        'error': 'Prohibido',
        'message': 'No tienes permiso para acceder a este recurso.'
    })
    response.status_code = 403
    return response

# Error 404 - Not Found (Recurso no encontrado)
def handle_404(error):
    response = jsonify({
        'error': 'Recurso no encontrado',
        'message': str(error)
    })
    response.status_code = 404
    return response

# Error 500 - Internal Server Error (Error interno del servidor)
def handle_500(error):
    response = jsonify({
        'error': 'Error interno del servidor',
        'message': 'Ocurrió un error inesperado en el servidor.'
    })
    response.status_code = 500
    return response

# Error 405 - Method Not Allowed (Método no permitido)
def handle_405(error):
    response = jsonify({
        'error': 'Método no permitido',
        'message': 'El método no está permitido para la URL solicitada.'
    })
    response.status_code = 405
    return response

# Error 401 - Unauthorized (No autorizado)
def handle_401(error):
    response = jsonify({
        'error': 'No autorizado',
        'message': 'Debes estar autenticado para acceder a este recurso.'
    })
    response.status_code = 401
    return response
