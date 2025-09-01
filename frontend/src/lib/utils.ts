// frontend/src/lib/utils.ts

import { Meal, DayPlan, WeekPlan } from "./types";
import { MEALS } from "./meals";

// Defines the days of the week.
export const DAYS = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];

// A helper function to pick a random item from an array.
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

/**
 * Generates a single day's meal plan to meet a calorie goal.
 * @param dayName The name of the day (e.g., "Lunes").
 * @param targetCals The daily calorie goal.
 * @returns A DayPlan object with a list of selected meals.
 */
export function makeDay(dayName: string, targetCals: number): DayPlan {
    const dailyPlan: Meal[] = [];
    let currentCals = 0;
    const availableMeals = [...MEALS];
    
    // Define a flexible range for the calorie goal (e.g., +/- 10%)
    const minCals = targetCals * 0.9;
    const maxCals = targetCals * 1.1;

    // A counter to prevent infinite loops if the goal can't be met.
    let attempts = 0;
    const maxAttempts = 50;

    // Loop until the calorie goal is met or max attempts are reached.
    while (currentCals < minCals && attempts < maxAttempts) {
        if (availableMeals.length === 0) {
            console.warn("No more meals available to meet the calorie goal.");
            break; // Stop if there are no more meal options.
        }
        
        const selectedMeal = pick(availableMeals);
        
        // Ensure adding the meal doesn't drastically exceed the max calories.
        if (currentCals + selectedMeal.calories <= maxCals || currentCals < minCals) {
            dailyPlan.push(selectedMeal);
            currentCals += selectedMeal.calories;
            
            // Remove the selected meal to prevent duplicates on the same day.
            const index = availableMeals.indexOf(selectedMeal);
            if (index > -1) {
                availableMeals.splice(index, 1);
            }
        }
        attempts++;
    }

    // Check if the plan is within the target range, otherwise return a message.
   // Si el plan no está dentro del rango objetivo, devuelve un array de comidas vacío.
if (currentCals < minCals || currentCals > maxCals) {
    return {
        day: dayName,
        meals: [],
    };
}
    return {
        day: dayName,
        meals: dailyPlan
    };
}

/**
 * Generates a full week's meal plan based on a daily calorie goal.
 * @param objetivo The daily calorie goal.
 * @returns A WeekPlan object.
 */
export function makeWeek(objetivo: number): WeekPlan {
    return {
        meta: { objetivo },
        days: DAYS.map((dayName) => makeDay(dayName, objetivo)),
    };
}