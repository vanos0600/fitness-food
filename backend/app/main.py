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

# --- CORRECCIÓN DE LA RUTA FINAL Y ROBUSTA ---

# 1. Obtiene la ruta del archivo actual (main.py): /.../backend/app/main.py
CURRENT_FILE_PATH = Path(__file__).resolve()

# 2. Obtiene el directorio padre (../backend/app)
BASE_DIR = CURRENT_FILE_PATH.parent

# 3. Calcula la ruta correcta al archivo: ../backend/data/meals.json
# Esto sube un nivel de 'app' a 'backend', y luego baja a 'data'
DATA_FILE_PATH = BASE_DIR.parent / "data" / "meals.json"


# 3. Cargar las comidas del JSON al iniciar
try:
    # Usamos la ruta absoluta y correcta calculada con Pathlib
    with open(DATA_FILE_PATH, "r", encoding="utf-8") as file:
        data = json.load(file)
        MEALS = data['desayuno'] + data['almuerzo'] + data['cena'] + data['snacks']
    print(f"✅ Archivo de datos cargado correctamente desde: {DATA_FILE_PATH}")

except FileNotFoundError as e:
    # Si esta ruta falla, es un error fatal, pues es la ruta correcta.
    print(f"❌ ERROR FATAL: No se pudo cargar el archivo de datos. [Ruta esperada: {DATA_FILE_PATH}]")
    print(f"Error específico: {e}")
    MEALS = [] # Inicializar vacío para evitar más errores

# 4. Endpoint de la API
@app.get("/menu-semanal")
def menu(objetivo: int):
    """
    Genera un menú semanal con comidas al azar hasta alcanzar el objetivo de calorías diario.
    """
    if not MEALS:
        return {"error": "El menú no pudo ser cargado. Revise los logs del servidor para ver el error FileNotFoundError."}
        
    return make_week(MEALS, objetivo)
