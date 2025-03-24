from flask import blueprints
from app import create_app

app = create_app()

for blueprint in blueprints:
    app.register_blueprint(blueprint)

if __name__ == '__main__':
    app.run()