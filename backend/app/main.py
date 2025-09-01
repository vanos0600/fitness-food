# backend/app/main.py
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from .utils import make_week
import json

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

# 3. Cargar las comidas del JSON al iniciar
with open("backend/data/meals.json", "r", encoding="utf-8") as file:
    data = json.load(file)
    MEALS = data['desayuno'] + data['almuerzo'] + data['cena'] + data['snacks']

# 4. Endpoint de la API
@app.get("/menu-semanal")
def menu(objetivo: int):
    """
    Genera un menú semanal con comidas al azar hasta alcanzar el objetivo de calorías diario.
    """
    return make_week(MEALS, objetivo)
