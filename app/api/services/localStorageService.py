import os
from werkzeug.utils import secure_filename

# Configuración
ALLOWED_EXTENSIONS = {"png", "jpg", "jpeg", "webp"}
MAX_FILE_SIZE_BYTES = 2 * 1024 * 1024  # 2 MB
BASE_STORAGE_PATH = "database/images"
DEFAULT_IMAGE_PATH = os.path.join(BASE_STORAGE_PATH, "default-userImg.webp")

def is_allowed_file(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED_EXTENSIONS

def is_allowed_size(file_obj):
    file_obj.seek(0, os.SEEK_END)
    size = file_obj.tell()
    file_obj.seek(0)
    return size <= MAX_FILE_SIZE_BYTES

def uploadImagePhoto(file_obj, tipo, identificador):
    if not file_obj or not getattr(file_obj, "filename", ""):
        print("⚠️ No se recibió archivo. Usando imagen por defecto.")
        return DEFAULT_IMAGE_PATH  # Ya se asumirá que se resuelve con /media/

    if not is_allowed_file(file_obj.filename):
        raise ValueError("Archivo no permitido. Solo se permiten imágenes PNG, JPG, JPEG o WEBP.")

    if not is_allowed_size(file_obj):
        raise ValueError("La imagen excede el tamaño máximo permitido (2 MB).")

    try:
        identificador = str(identificador).strip()
        filename = secure_filename(file_obj.filename)

        carpeta_relativa = os.path.join(tipo, identificador)
        carpeta_absoluta = os.path.join(BASE_STORAGE_PATH, carpeta_relativa)
        os.makedirs(carpeta_absoluta, exist_ok=True)

        ruta_final = os.path.join(carpeta_absoluta, filename)
        file_obj.save(ruta_final)

        ruta_relativa_web = os.path.join(carpeta_relativa, filename).replace("\\", "/")

        print(f"✅ Imagen guardada en: {ruta_final}")
        print(f"🌐 Ruta relativa para el navegador: /media/{ruta_relativa_web}")
        return ruta_relativa_web

    except Exception as e:
        print(f"❌ Error al guardar la imagen: {e}")
        raise ValueError("Error inesperado al guardar la imagen.")
