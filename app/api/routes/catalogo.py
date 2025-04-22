from flask.views import MethodView
from flask_smorest import Blueprint
from api.models.marca import Marca
from api.models.transmision import Transmision
from api.models.traccion import Traccion
from api.models.status import Status
from api.decorators.auth import require_api_key

blp = Blueprint(
    "catalogo",
    __name__,
    url_prefix="/catalogo",
    description="Catálogo de valores base para formularios"
)

@blp.route("/vehiculos")
class CatalogoVehiculosResource(MethodView):

    @require_api_key
    def get(self):
        return {
            "marcas": [{"id": m.id, "nombre": m.nombre} for m in Marca.query.all()],
            "transmisiones": [{"id": t.id, "tipo": t.tipo} for t in Transmision.query.all()],
            "tracciones": [{"id": t.id, "tipo": t.tipo} for t in Traccion.query.all()],
            "estados": [{"id": e.id, "estado": e.estado} for e in Status.query.all()]
        }


