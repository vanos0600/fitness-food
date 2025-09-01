import { Meal } from "./types";

export const MEALS: Meal[] = [
    {
        id: "arepa-claras",
        name: "Arepa integral con claras y aguacate",
        type: "desayuno",
        calories: 420, // Corrected from `cals`
        protein: 32,
        carbs: 38,
        fat: 14,
        ingredients: [
            { item: "Arepa integral", qty: "1 mediana" },
            { item: "Claras de huevo", qty: "4" },
            { item: "Aguacate", qty: "40 g" },
            { item: "Tomate", qty: "3 rodajas" },
            { item: "Aceite de oliva", qty: "1 cdita" },
        ],
    },
    {
        id: "bowl-pollo-chipotle",
        name: "Bowl de pollo chipotle con quinoa",
        type: "almuerzo",
        calories: 520, // Corrected from `cals`
        protein: 45,
        carbs: 48,
        fat: 16,
        ingredients: [
            { item: "Pechuga de pollo", qty: "150 g" },
            { item: "Quinoa cocida", qty: "3/4 taza" },
            { item: "Pimiento y cebolla", qty: "1/2 taza" },
            { item: "Chipotle en adobo", qty: "1 cda" },
            { item: "Maíz", qty: "1/4 taza" },
        ],
    },
];