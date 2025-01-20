#api/__init__.py

from .routes.test import inicio_bp

blueprints = [
    inicio_bp
]
    
def init_app(app):
    for blueprint in blueprints:
        app.register_blueprint(blueprint)