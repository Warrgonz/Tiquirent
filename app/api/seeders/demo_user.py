import click
from flask.cli import with_appcontext
from api.models.users import Users
from api.extensions import db
from api.utils.hashing import hash_password

@click.command("seed-demo-user")
@with_appcontext
def seed_demo_user():
    """Crea un usuario de prueba llamado macaco."""
    if Users.query.filter_by(nombre_usuario="macaco").first():
        click.echo("⚠️  El usuario 'macaco' ya existe.")
        return

    user = Users(
        cedula="118440720",
        nombre_usuario="macaco",
        email="acastrog38@gmail.com",
        contrasena=hash_password("macaco123"),
        rol_id=1,
        estado_id=1
    )
    db.session.add(user)
    db.session.commit()
    click.echo("✅ Usuario 'macaco' creado correctamente.")
