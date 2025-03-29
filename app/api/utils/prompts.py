from flask import current_app
from sqlalchemy import text, inspect
from config.database import db
from flask_seeder import FlaskSeeder

from database.seeds.roles_seeder import RolesSeeder

def init_prompts():
    @current_app.cli.command("test-db")
    def test_db():
        """Probar la conexión a la base de datos"""
        try:
            # Usando Flask-SQLAlchemy
            result = db.session.execute(text("SELECT @@VERSION")).scalar()
            print("✅ Conexión exitosa!")
            print(f"Versión de SQL Server: {result}")
        except Exception as e:
            print("❌ Error de conexión!")
            print(f"Error: {str(e)}")
        finally:
            db.session.close()

    @current_app.cli.command("show-tables")
    def show_tables():
        """Mostrar todas las tablas en la base de datos"""
        try:
            inspector = inspect(db.engine)
            tables = inspector.get_table_names()

            if tables:
                print("\nTablas en la base de datos:")
                for table in tables:
                    print(f"\n📋 Tabla: {table}")
                    columns = inspector.get_columns(table)
                    for column in columns:
                        print(f"  ├── {column['name']}")
                        print(f"  │   └── Tipo: {column['type']}")
            else:
                print("\n⚠️ No se encontraron tablas en la base de datos.")
        except Exception as e:
            print(f"\n❌ Error: {str(e)}")

    @current_app.cli.command("list-models")
    def list_models():
        """Listar todos los modelos registrados en SQLAlchemy"""
        print("\nModelos registrados en SQLAlchemy:")
        for model in db.Model.__subclasses__():
            print(f"- {model.__name__}")

    @current_app.cli.command("seed-roles")
    def seed_roles():
        """Ejecutar el seeder de roles manualmente"""
        print("Ejecutando el seeder de roles...")
        seeder = RolesSeeder()
        seeder.run()
        print("✅ Seeder de roles ejecutado correctamente.")
