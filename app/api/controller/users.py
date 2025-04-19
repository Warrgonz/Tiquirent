#api/controller/users.py

import secrets
import string

def CreateUser():

    info = info.user_exist()
    return "Hola mundo"

def user_exist():
    return "yucateco tactico"

def generate_temp_password(length=8):
    """Genera una contraseña temporal aleatoria segura."""
    characters = string.ascii_letters + string.digits
    return ''.join(secrets.choice(characters) for _ in range(length))
