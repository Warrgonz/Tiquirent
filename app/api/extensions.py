# api/utils/extensions.py

from flask_sqlalchemy import SQLAlchemy
from flask_smorest import Api
from flask_cors import CORS

# Extensiones compartidas
db = SQLAlchemy()
api = Api()  
cors = CORS()



