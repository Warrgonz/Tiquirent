from marshmallow import Schema, fields

class VehiculoSchema(Schema):
    id = fields.Int()
    asin = fields.Str()
    modelo = fields.Str()
    marca = fields.Method("get_marca")
    año = fields.Int()
    placa = fields.Str()
    color = fields.Str()
    ruta_imagen = fields.Str()
    precio_diario = fields.Float()
    transmision = fields.Method("get_transmision")
    traccion = fields.Method("get_traccion")
    puertas = fields.Int()
    numero_asientos = fields.Int()
    estado = fields.Method("get_estado")

    def get_marca(self, obj):
        return obj.marca.nombre if obj.marca else None

    def get_transmision(self, obj):
        return obj.transmision.tipo if obj.transmision else None

    def get_traccion(self, obj):
        return obj.traccion.tipo if obj.traccion else None

    def get_estado(self, obj):
        return obj.estado.estado if obj.estado else None
