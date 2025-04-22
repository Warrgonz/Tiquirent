from app.routes.signIn import signIn_bp
from app.routes.users import users_bp
from app.routes.dashboard import dashboard_bp
from app.routes.reservations import reservations_bp
from app.routes.vehicles import vehicles_bp
from app.routes.profiles import profiles_bp
from app.routes.signOut import signOut_bp

blueprints = [
    signIn_bp,
    users_bp,
    dashboard_bp,
    reservations_bp,
    vehicles_bp,
    profiles_bp,
    signOut_bp
]
    
def init_app(app):
    for blueprint in blueprints:
        app.register_blueprint(blueprint)