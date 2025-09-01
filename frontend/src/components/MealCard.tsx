import React from 'react';
import { Meal } from '../lib/types';

interface MealCardProps {
    meal: Meal;
}

const MealCard: React.FC<MealCardProps> = ({ meal }) => {
    return (
        <div className="mt-2 rounded-lg bg-white p-4 shadow">
            <h4 className="font-semibold">{meal.name}</h4>
            <p className="text-sm text-gray-500">{meal.calories} kcal</p>
            {/* Opcional: Mostrar macronutrientes solo si existen en los datos */}
            {meal.protein && meal.carbs && meal.fat && (
                <div className="flex justify-between mt-1 text-xs text-gray-500">
                    <span>P: {meal.protein}g</span>
                    <span>C: {meal.carbs}g</span>
                    <span>G: {meal.fat}g</span>
                </div>
            )}
        </div>
    );
};

export default MealCard;