from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .utils import make_week
import json
from pathlib import Path
import os

# 1. Crear la app
app = FastAPI()

# 2. Middleware para permitir peticiones desde el frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # En producción pon el dominio del frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# --- CORRECCIÓN DE LA RUTA ---
# Obtiene la ruta del archivo actual (main.py)
# Path(__file__).resolve() es la ruta absoluta del main.py
BASE_DIR = Path(__file__).resolve().parent

# La carpeta 'data' está un nivel arriba de 'app' y a un lado de 'backend'
# /src/backend/app/ -> /src/backend/ -> /src/backend/data/meals.json
# Calculamos la ruta como: BASE_DIR (app) / '..' (backend) / 'data' / 'meals.json'
# Usamos dos niveles de parent (.parent.parent) para asegurar la compatibilidad con diferentes estructuras
DATA_FILE_PATH = BASE_DIR.parent.parent / "backend" / "data" / "meals.json"

# Para asegurarnos de que la ruta siempre sea correcta en entornos de despliegue,
# usaremos la ruta relativa a la raíz del proyecto, asumiendo que el PYTHONPATH
# y el directorio de trabajo ya están configurados correctamente.
# Sin embargo, la forma más segura es usar os.path.join para construir la ruta
# usando la carpeta del archivo actual (__file__).

# Como el Start Command se ejecuta en la raíz, a veces la ruta simple funciona:
# Intentaremos la ruta que funciona con el Start Command de Render: /opt/render/project/src/
PROJECT_ROOT = Path(os.getcwd())
DATA_FILE_PATH_SAFE = PROJECT_ROOT / "backend" / "data" / "meals.json"


# 3. Cargar las comidas del JSON al iniciar
try:
    # Usamos la ruta absoluta al archivo
    with open(DATA_FILE_PATH_SAFE, "r", encoding="utf-8") as file:
        data = json.load(file)
        MEALS = data['desayuno'] + data['almuerzo'] + data['cena'] + data['snacks']
    print(f"✅ Archivo de datos cargado correctamente desde: {DATA_FILE_PATH_SAFE}")

except FileNotFoundError:
    print(f"❌ ERROR: No se encontró el archivo en: {DATA_FILE_PATH_SAFE}")
    # Si la ruta absoluta falla, intenta la ruta que funciona en el entorno de desarrollo local
    try:
        with open("backend/data/meals.json", "r", encoding="utf-8") as file:
            data = json.load(file)
            MEALS = data['desayuno'] + data['almuerzo'] + data['cena'] + data['snacks']
        print("✅ Archivo cargado usando la ruta de desarrollo local.")
    except Exception as e:
        print(f"❌ ERROR FATAL: No se pudo cargar el archivo de datos. {e}")
        MEALS = [] # Inicializar vacío para evitar más errores

# 4. Endpoint de la API
@app.get("/menu-semanal")
def menu(objetivo: int):
    """
    Genera un menú semanal con comidas al azar hasta alcanzar el objetivo de calorías diario.
    """
    if not MEALS:
        return {"error": "El menú no pudo ser cargado. Revise los logs del servidor."}
        
    return make_week(MEALS, objetivo)
