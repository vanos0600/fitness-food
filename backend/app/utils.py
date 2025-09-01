# backend/app/utils.py
import random

DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"]

def pick(arr):
    """Devuelve un ítem aleatorio de una lista"""
    return random.choice(arr)

def make_day(day_name: str, target_cals: int, meals: list):
    """Genera un plan de comidas para un día"""
    daily_plan = []
    current_cals = 0
    available_meals = meals.copy()

    min_cals = target_cals * 0.9
    max_cals = target_cals * 1.1

    attempts = 0
    max_attempts = 50

    while current_cals < min_cals and attempts < max_attempts:
        if not available_meals:
            break

        meal = pick(available_meals)

        if current_cals + meal["calories"] <= max_cals or current_cals < min_cals:
            daily_plan.append(meal)
            current_cals += meal["calories"]
            available_meals.remove(meal)

        attempts += 1

    if current_cals < min_cals or current_cals > max_cals:
        return {"day": day_name, "meals": []}

    return {"day": day_name, "meals": daily_plan}

def make_week(meals: list, objetivo: int):
    """Genera un plan semanal de comidas"""
    return {
        "meta": {"objetivo": objetivo},
        "days": [make_day(day, objetivo, meals) for day in DAYS]
    }
