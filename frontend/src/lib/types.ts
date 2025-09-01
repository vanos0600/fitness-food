export interface Ingredient {
    item: string;
    qty: string;
}

export interface Meal {
    id: string;
    name: string;
    type: string;
    calories: number;
    protein?: number;
    carbs?: number;
    fat?: number;
    ingredients?: Ingredient[];
}

export interface DayPlan {
    meals: Meal[];
    day: string;  
}//

export interface WeekPlan {
    days: DayPlan[];
    meta: { objetivo: number };
}         