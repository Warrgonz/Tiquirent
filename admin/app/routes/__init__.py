from app.routes.signIn import signIn_bp

blueprints = [
    signIn_bp
]
    
def init_app(app):
    for blueprint in blueprints:
        app.register_blueprint(blueprint)