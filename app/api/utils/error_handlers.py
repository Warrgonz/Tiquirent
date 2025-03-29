from flask import render_template, jsonify, request
from .exceptions import APIError

def register_error_handlers(app):
    def wants_json_response():
        return request.accept_mimetypes['application/json'] >= \
               request.accept_mimetypes['text/html']

    @app.errorhandler(404)
    def not_found_error(error):
        if wants_json_response():
            return jsonify({
                'status': 'error',
                'message': 'Resource not found'
            }), 404
        return render_template('errors/404.html'), 404

    @app.errorhandler(400)
    def bad_request_error(error):
        if wants_json_response():
            return jsonify({
                'status': 'error',
                'message': 'Bad request'
            }), 400
        return render_template('errors/400.html'), 400

    @app.errorhandler(500)
    def internal_error(error):
        if wants_json_response():
            return jsonify({
                'status': 'error',
                'message': 'Internal server error'
            }), 500
        return render_template('errors/500.html'), 500