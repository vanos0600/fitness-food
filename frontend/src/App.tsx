import React, { useState, useEffect } from "react";

// Interfaces de TypeScript para la estructura de datos.
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
  photo?: string;
  recipe?: string;
  description?: string;
}

export interface DayPlan {
  meals: Meal[];
  day: string;
}

export interface WeekPlan {
  days: DayPlan[];
  meta: { objetivo: number };
}

// Bancos de datos de platillos para cada tipo de comida
const desayunos: Omit<Meal, 'id' | 'type'>[] = [
  { name: "Huevos Rancheros Ligeros", calories: 350, protein: 20, carbs: 30, fat: 15,
    description: "Dos huevos pochados sobre una tortilla de maíz, cubiertos con salsa de tomate y frijoles negros.",
    ingredients: [{ item: "Huevos", qty: "2" }, { item: "Tortillas de maíz", qty: "1" }, { item: "Salsa de tomate", qty: "1/4 taza" }, { item: "Frijoles negros", qty: "1/4 taza" }],
    recipe: "Instrucciones:\n1. Calienta la tortilla. Cocina los huevos. 2. Sirve los huevos sobre la tortilla y baña con salsa y frijoles.",
    photo: "images/huevos.jpg"
  },
  { name: "Batido de Proteína y Frutos Secos", calories: 420, protein: 30, carbs: 40, fat: 15,
    description: "Un batido energizante con proteína de suero, leche de almendras, mantequilla de cacahuete y un toque de miel.",
    ingredients: [{ item: "Proteína de suero", qty: "1 scoop" }, { item: "Leche de almendras", qty: "1 taza" }, { item: "Mantequilla de cacahuete", qty: "1 cda" }, { item: "Hielo", qty: "1 puñado" }],
    recipe: "Instrucciones:\n1. Licúa todos los ingredientes hasta obtener una mezcla homogénea y cremosa. Sirve de inmediato.",
    photo: "images/frutossecos.jpg"
  },
  { name: "Tostadas de Aguacate y Salmón Ahumado", calories: 380, protein: 25, carbs: 20, fat: 20,
    description: "Una rebanada de pan integral tostado, untada con aguacate y coronada con finas lonchas de salmón ahumado.",
    ingredients: [{ item: "Pan integral", qty: "1 rebanada" }, { item: "Aguacate", qty: "1/2" }, { item: "Salmón ahumado", qty: "50g" }],
    recipe: "Instrucciones:\n1. Tuesta el pan. 2. Machaca el aguacate y úntalo sobre el pan. 3. Coloca el salmón encima y decora con un poco de eneldo.",
    photo: "images/tostadas.jpg"
  },
  { name: "Avena con Frutas y Canela", calories: 300, protein: 10, carbs: 50, fat: 5,
    description: "Avena cremosa cocida, endulzada con un toque de canela y servida con fruta fresca de temporada.",
    ingredients: [{ item: "Avena en hojuelas", qty: "1/2 taza" }, { item: "Leche o agua", qty: "1 taza" }, { item: "Fruta picada", qty: "1/2 taza" }, { item: "Canela en polvo", qty: "1 pizca" }],
    recipe: "Instrucciones:\n1. Cocina la avena con la leche/agua hasta que esté suave. 2. Sirve en un tazón y agrega la fruta y canela por encima.",
    photo: "images/avena.jpg"
  },
  { name: "Yogur Griego con Granola Casera", calories: 320, protein: 20, carbs: 35, fat: 10,
    description: "Un clásico nutritivo: yogur griego natural con granola crujiente y un chorrito de miel.",
    ingredients: [{ item: "Yogur griego", qty: "1 taza" }, { item: "Granola", qty: "1/4 taza" }, { item: "Miel", qty: "1 cdta" }],
    recipe: "Instrucciones:\n1. Vierte el yogur en un recipiente. 2. Espolvorea la granola y la miel por encima.",
    photo: "images/granola.jpg"
  },
  { name: "Tortilla de Claras con Espinacas", calories: 280, protein: 25, carbs: 10, fat: 5,
    description: "Una tortilla ligera y esponjosa hecha con claras de huevo, rellena de espinacas salteadas.",
    ingredients: [{ item: "Claras de huevo", qty: "4" }, { item: "Espinacas", qty: "1 puñado" }, { item: "Aceite de oliva", qty: "1 cdta" }],
    recipe: "Instrucciones:\n1. Saltea las espinacas en aceite. 2. Bate las claras y viértelas en la sartén. 3. Cocina hasta que la tortilla esté firme.",
    photo: "images/espinacas.jpg"
  },
];

const almuerzos: Omit<Meal, 'id' | 'type'>[] = [
  { name: "Salmón a la Plancha con Quinoa", calories: 550, protein: 35, carbs: 45, fat: 20,
    description: "Un filete de salmón perfectamente cocido, servido sobre una cama de quinoa y vegetales al vapor.",
    ingredients: [{ item: "Salmón", qty: "150g" }, { item: "Quinoa", qty: "1/2 taza" }, { item: "Brócoli", qty: "1 taza" }],
    recipe: "Instrucciones:\n1. Cocina el salmón a la plancha. 2. Hierve la quinoa y cocina el brócoli al vapor. 3. Sirve todo junto.",
    photo: "images/grill.jpg"
  },
  { name: "Ensalada César con Pollo a la Parrilla", calories: 480, protein: 40, carbs: 20, fat: 25,
    description: "Una versión saludable de la clásica ensalada, con pechuga de pollo a la parrilla, crutones integrales y aderezo ligero.",
    ingredients: [{ item: "Pechuga de pollo", qty: "150g" }, { item: "Lechuga romana", qty: "2 tazas" }, { item: "Crutones integrales", qty: "1/4 taza" }, { item: "Aderezo César bajo en grasa", qty: "2 cdas" }],
    recipe: "Instrucciones:\n1. Cocina y corta el pollo. 2. Mezcla la lechuga con el aderezo, agrega el pollo y crutones.",
    photo: "images/cesar.jpg"
  },
  { name: "Tacos de Lentejas y Verduras", calories: 450, protein: 20, carbs: 60, fat: 15,
    description: "Tortillas de maíz rellenas de una mezcla sabrosa de lentejas y vegetales salteados. Un plato vegetariano delicioso.",
    ingredients: [{ item: "Lentejas cocidas", qty: "1 taza" }, { item: "Pimientos", qty: "1/2" }, { item: "Cebolla", qty: "1/4" }, { item: "Tortillas de maíz", qty: "2" }],
    recipe: "Instrucciones:\n1. Saltea los vegetales. 2. Agrega las lentejas y cocina por unos minutos. 3. Calienta las tortillas y rellénalas.",
    photo: "images/tacos.jpg"
  },
  { name: "Bowl de Arroz Integral con Tofu y Aguacate", calories: 500, protein: 25, carbs: 50, fat: 20,
    description: "Un tazón nutritivo con arroz integral, tofu marinado y salteado, aguacate cremoso y semillas de sésamo.",
    ingredients: [{ item: "Arroz integral", qty: "1/2 taza" }, { item: "Tofu firme", qty: "100g" }, { item: "Aguacate", qty: "1/2" }, { item: "Semillas de sésamo", qty: "1 cdta" }],
    recipe: "Instrucciones:\n1. Cocina el arroz. 2. Saltea el tofu marinado. 3. Sirve el arroz, tofu, aguacate y espolvorea semillas.",
    photo: "images/bowtofu.jpg"
  },
  { name: "Sándwich de Pavo y Palta", calories: 400, protein: 30, carbs: 35, fat: 15,
    description: "Un sándwich sustancioso en pan integral con pechuga de pavo, aguacate, lechuga y tomate.",
    ingredients: [{ item: "Pan integral", qty: "2 rebanadas" }, { item: "Pechuga de pavo", qty: "100g" }, { item: "Aguacate", qty: "1/4" }, { item: "Lechuga", qty: "1 hoja" }, { item: "Tomate", qty: "1 rodaja" }],
    recipe: "Instrucciones:\n1. Tuesta el pan si lo deseas. 2. Arma el sándwich con todos los ingredientes.",
    photo: "images/sandwich.jpg"
  },
  { name: "Estofado de Ternera y Vegetales", calories: 600, protein: 40, carbs: 50, fat: 25,
    description: "Un estofado reconfortante con trozos de ternera magra, zanahorias, papas y apio, cocinado a fuego lento.",
    ingredients: [{ item: "Ternera magra", qty: "150g" }, { item: "Papas", qty: "1" }, { item: "Zanahorias", qty: "1" }, { item: "Apio", qty: "1 tallo" }],
    recipe: "Instrucciones:\n1. Cocina la ternera en una olla con caldo hasta que esté tierna. 2. Agrega las verduras y cocina hasta que estén blandas.",
    photo: "images/estofado.jpg"
  },
];

const cenas: Omit<Meal, 'id' | 'type'>[] = [
  { name: "Pescado al Horno con Limón y Hierbas", calories: 400, protein: 35, carbs: 10, fat: 20,
    description: "Filete de pescado blanco horneado a la perfección, con un toque de limón y hierbas frescas.",
    ingredients: [{ item: "Filete de pescado", qty: "120g" }, { item: "Limón", qty: "1/2" }, { item: "Perejil", qty: "al gusto" }],
    recipe: "Instrucciones:\n1. Coloca el pescado en una bandeja. 2. Rocía con limón y perejil. 3. Hornea a 200°C por 15-20 minutos.",
    photo: "images/pescado.jpg"
  },
  { name: "Pollo y Verduras al Wok", calories: 450, protein: 30, carbs: 35, fat: 20,
    description: "Tiras de pechuga de pollo salteadas con una variedad de vegetales crujientes y salsa de soya baja en sodio.",
    ingredients: [{ item: "Pechuga de pollo", qty: "120g" }, { item: "Brócoli, pimientos, cebolla", qty: "1 taza" }, { item: "Salsa de soya", qty: "1 cda" }],
    recipe: "Instrucciones:\n1. Saltea el pollo en un wok. 2. Agrega las verduras y cocina hasta que estén tiernas. 3. Añade la salsa de soya.",
    photo: "images/wok.jpg"
  },
  { name: "Sopa de Lentejas y Calabaza", calories: 380, protein: 18, carbs: 60, fat: 5,
    description: "Una sopa densa y nutritiva, perfecta para una cena ligera, con lentejas, calabaza y especias.",
    ingredients: [{ item: "Lentejas", qty: "1/2 taza" }, { item: "Calabaza", qty: "1 taza" }, { item: "Caldo de verduras", qty: "2 tazas" }],
    recipe: "Instrucciones:\n1. Hierve las lentejas con la calabaza en el caldo. 2. Cocina hasta que estén tiernas. Puedes licuar una parte para una textura más cremosa.",
    photo: "images/clabaza.jpg"
  },
  { name: "Bowl de Quinua y Garbanzos", calories: 420, protein: 20, carbs: 60, fat: 10,
    description: "Un tazón vegetariano rico en proteínas, con quinua cocida, garbanzos, espinacas y un aderezo de limón y ajo.",
    ingredients: [{ item: "Quinua", qty: "1/2 taza" }, { item: "Garbanzos", qty: "1/2 taza" }, { item: "Espinacas", qty: "1 puñado" }, { item: "Limón", qty: "1/2" }],
    recipe: "Instrucciones:\n1. Cocina la quinua. 2. Saltea los garbanzos con espinacas y ajo. 3. Mezcla todo y adereza con jugo de limón.",
    photo: "images/quinoa.jpg"
  },
  { name: "Ensalada de Atún Fresco y Aguacate", calories: 480, protein: 35, carbs: 20, fat: 25,
    description: "Una ensalada fresca y completa con lomo de atún sellado, aguacate, tomate y pepino.",
    ingredients: [{ item: "Lomo de atún fresco", qty: "120g" }, { item: "Aguacate", qty: "1/2" }, { item: "Tomate", qty: "1" }, { item: "Pepino", qty: "1/4" }],
    recipe: "Instrucciones:\n1. Sella el lomo de atún en una sartén. 2. Corta los vegetales y mezcla en un tazón. 3. Sirve el atún rebanado sobre la ensalada.",
    photo: "images/aguacate.jpg"
  },
  { name: "Pollo al Curry con Arroz Basmati", calories: 500, protein: 30, carbs: 60, fat: 15,
    description: "Un curry de pollo aromático y cremoso, cocinado con leche de coco y servido con arroz basmati.",
    ingredients: [{ item: "Pechuga de pollo", qty: "150g" }, { item: "Curry en polvo", qty: "1 cda" }, { item: "Leche de coco", qty: "1/2 taza" }, { item: "Arroz basmati", qty: "1/2 taza" }],
    recipe: "Instrucciones:\n1. Cocina el pollo y añade el curry. 2. Vierte la leche de coco y deja cocinar. 3. Sirve con arroz basmati.",
    photo: "images/curry.jpg"
  },
];

const snacks: Omit<Meal, 'id' | 'type'>[] = [
  { name: "Puñado de Almendras", calories: 180, protein: 6, carbs: 6, fat: 15,
    description: "Un puñado de almendras tostadas sin sal, una fuente rápida de energía y grasas saludables.",
    ingredients: [{ item: "Almendras", qty: "30g" }],
    recipe: "Disfruta de un puñado de almendras como un snack rápido y nutritivo.",
    photo: "/images/almonds.jpg"
  },
  { name: "Yogur Griego con Bayas", calories: 150, protein: 15, carbs: 15, fat: 2,
    description: "Yogur griego natural, rico en proteínas, con una mezcla de bayas frescas.",
    ingredients: [{ item: "Yogur griego", qty: "1/2 taza" }, { item: "Bayas mixtas", qty: "1/4 taza" }],
    recipe: "Mezcla el yogur con las bayas y disfruta.",
    photo: "/images/jogurt.jpg"
  },
  { name: "Manzana con Mantequilla de Cacahuete", calories: 200, protein: 5, carbs: 25, fat: 10,
    description: "Rodajas de manzana crujientes con una cucharada de mantequilla de cacahuete natural.",
    ingredients: [{ item: "Manzana", qty: "1" }, { item: "Mantequilla de cacahuete", qty: "1 cda" }],
    recipe: "Corta la manzana en rodajas y úntale la mantequilla de cacahuete.",
    photo: "images/manza.jpg"
  },
  { name: "Barra de Cereal Integral", calories: 150, protein: 5, carbs: 20, fat: 5,
    description: "Una barra de cereal integral, ideal para llevar y con un buen equilibrio de carbohidratos.",
    ingredients: [{ item: "Barra de cereal", qty: "1 unidad" }],
    recipe: "Consume como un snack rápido.",
    photo: "images/barra.jpg"
  },
  { name: "Batido de Frutos Rojos", calories: 220, protein: 8, carbs: 40, fat: 2,
    description: "Un batido refrescante y lleno de antioxidantes, hecho con yogur y frutos rojos congelados.",
    ingredients: [{ item: "Yogur natural", qty: "1/2 taza" }, { item: "Frutos rojos congelados", qty: "1 taza" }],
    recipe: "Licúa todos los ingredientes hasta que la mezcla sea suave.",
    photo: "images/batido.jpg"
  },
  { name: "Requesón con Melocotón", calories: 190, protein: 18, carbs: 15, fat: 5,
    description: "Una porción de requesón cremoso, servido con rodajas de melocotón fresco o en conserva sin azúcar.",
    ingredients: [{ item: "Requesón", qty: "1/2 taza" }, { item: "Melocotón", qty: "1/2" }],
    recipe: "Mezcla el requesón con el melocotón picado.",
    photo: "images/melocoton.jpg"
  },
];


/**
 * Función para generar recetas y descripciones de comidas de forma dinámica.
 * Las calorías y los detalles varían según la meta calórica.
 */
const generateDynamicMeal = (type: "desayuno" | "almuerzo" | "cena" | "snacks"): Meal => {
  let mealData: Omit<Meal, 'id' | 'type'>;
  switch (type) {
    case "desayuno":
      mealData = desayunos[Math.floor(Math.random() * desayunos.length)];
      break;
    case "almuerzo":
      mealData = almuerzos[Math.floor(Math.random() * almuerzos.length)];
      break;
    case "cena":
      mealData = cenas[Math.floor(Math.random() * cenas.length)];
      break;
    case "snacks":
      mealData = snacks[Math.floor(Math.random() * snacks.length)];
      break;
  }
  
  return {
    ...mealData,
    id: `${type}-${Date.now()}-${Math.random()}`,
    type: type.charAt(0).toUpperCase() + type.slice(1)
  };
};

const fetchMenu = async (objetivo: number): Promise<WeekPlan> => {
  console.log(`Simulando la obtención del menú para el objetivo calórico: ${objetivo}`);
  await new Promise(resolve => setTimeout(resolve, 1000));

  const daysOfWeek = ["Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado", "Domingo"];
  const weekPlan: WeekPlan = {
    meta: { objetivo },
    days: [],
  };
  
  for (const day of daysOfWeek) {
    const dayPlan: DayPlan = {
      day: day,
      meals: [],
    };
    
    dayPlan.meals.push(generateDynamicMeal("desayuno"));
    dayPlan.meals.push(generateDynamicMeal("almuerzo"));
    dayPlan.meals.push(generateDynamicMeal("cena"));
    dayPlan.meals.push(generateDynamicMeal("snacks"));

    weekPlan.days.push(dayPlan);
  }

  return weekPlan;
};

// Componente principal de la aplicación.
const App: React.FC = () => {
  const [objetivo, setObjetivo] = useState<number>(2100);
  const [menu, setMenu] = useState<WeekPlan | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [expandedMealId, setExpandedMealId] = useState<string | null>(null);

  // Calcula el total de calorías de un plan diario
  const calculateDailyCalories = (dayPlan: DayPlan): number => {
    return dayPlan.meals.reduce((total, meal) => total + meal.calories, 0);
  };

  // Calcula el total de calorías de toda la semana
  const calculateWeeklyCalories = (weekPlan: WeekPlan): number => {
    return weekPlan.days.reduce((total, dayPlan) => total + calculateDailyCalories(dayPlan), 0);
  };
  
  // Calcula el porcentaje de calorías diario
  const calculateDailyPercentage = (dayPlan: DayPlan): number => {
    const dailyTotal = calculateDailyCalories(dayPlan);
    return Math.min(100, (dailyTotal / objetivo) * 100);
  };
  
  // Devuelve el color de la barra de progreso basado en el porcentaje
  const getProgressBarColor = (percentage: number): string => {
    if (percentage < 80) return "#2ECC71"; // Verde
    if (percentage <= 100) return "#F5A623"; // Naranja
    return "#D32F2F"; // Rojo
  };

  const generarMenu = async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchMenu(objetivo);
      setMenu(data);
    } catch (err) {
      setError("No se pudo conectar con el servidor. Por favor, inténtalo de nuevo.");
      setMenu(null);
    } finally {
      setLoading(false);
    }
  };
  
  const toggleRecipe = (mealId: string) => {
    setExpandedMealId(expandedMealId === mealId ? null : mealId);
  };

  return (
    <>
       
      <style>
        {`
          /* ==========================
            IMPORTS & VARIABLES - ESTILO AÑOS 60 Y VIDA SANA
          ========================== */
          @import url('https://fonts.googleapis.com/css2?family=Pacifico&family=Oswald:wght@400;700&family=Montserrat:wght@400;600&display=swap');

          :root {
            --primary-color: #FF5722; /* Naranja vibrante de los 60 */
            --secondary-color: #4CAF50; /* Verde saludable */
            --accent-color: #2196F3; /* Azul energético */
            --background-color: #FFF9C4; /* Amarillo claro retro */
            --card-background: #FFFFFF; 
            --card-secondary-background: #F5F5F5;
            --card-image-overlay: rgba(0, 0, 0, 0.4);
            --border-color: #BDBDBD;
            --text-color-dark: #212121; 
            --text-color-medium: #757575; 
            --text-color-light: #BDBDBD; 
            --error-color: #F44336;
            --hover-primary: #E64A19;
            --pattern-color: #FFC107; /* Amarillo patrón */
          }

          /* ==========================
            GLOBAL STYLES
          ========================== */
          body {
            font-family: 'Montserrat', sans-serif;
            background-color: var(--background-color);
            margin: 0;
            padding: 0;
            line-height: 1.6;
            color: var(--text-color-dark);
            box-sizing: border-box;
            background-image: 
              radial-gradient(circle at 25% 25%, var(--pattern-color) 2px, transparent 2px),
              radial-gradient(circle at 75% 75%, var(--pattern-color) 2px, transparent 2px);
            background-size: 30px 30px;
          }

          *, *::before, *::after {
            box-sizing: inherit;
          }

          .container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 2rem 1rem;
          }
          
          /* ==========================
            MAIN CARD - ESTILO RETRO
          ========================== */
          .main-card {
            background-color: var(--card-background);
            border-radius: 12px;
            box-shadow: 0 8px 16px rgba(0,0,0,0.15);
            padding: 2rem;
            width: 100%;
            max-width: 90rem;
            margin: 0 auto;
            border: 3px solid var(--primary-color);
            position: relative;
            overflow: hidden;
          }

          .main-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 8px;
            background: linear-gradient(90deg, var(--primary-color), var(--secondary-color), var(--accent-color));
          }

          /* ==========================
            TYPOGRAPHY - ESTILO AÑOS 60
          ========================== */
          .title {
            font-family: 'Pacifico', cursive;
            font-size: 3.5rem;
            font-weight: 400;
            text-align: center;
            margin-bottom: 0.5rem;
            color: var(--primary-color);
            text-shadow: 2px 2px 0px var(--accent-color);
            letter-spacing: 1px;
          }
          
          .motto {
            font-family: 'Oswald', sans-serif;
            text-align: center;
            color: var(--text-color-medium);
            margin-bottom: 2rem;
            font-size: 1.3rem;
            text-transform: uppercase;
            letter-spacing: 2px;
          }

          /* ==========================
            FORM ELEMENTS - ESTILO RETRO
          ========================== */
          .input-group {
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 2rem;
          }

          .input-field {
            width: 100%;
            border: 2px solid var(--border-color);
            background-color: var(--card-secondary-background);
            border-radius: 8px;
            padding: 0.75rem;
            font-size: 1.125rem;
            outline: none;
            transition: all 0.3s;
            color: var(--text-color-dark);
            font-family: 'Montserrat', sans-serif;
          }

          .input-field:focus {
            border-color: var(--primary-color);
            box-shadow: 0 0 0 3px rgba(255, 87, 34, 0.3);
          }

          .button {
            width: 100%;
            padding: 0.75rem 1.5rem;
            color: white;
            background: linear-gradient(135deg, var(--primary-color), var(--accent-color));
            border-radius: 8px;
            font-size: 1.125rem;
            font-weight: 600;
            text-transform: uppercase;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            box-shadow: 0 4px 8px rgba(0,0,0,0.2);
            font-family: 'Oswald', sans-serif;
            letter-spacing: 1px;
          }

          .button:hover {
            transform: translateY(-3px);
            box-shadow: 0 6px 12px rgba(0,0,0,0.25);
          }
          
          .button:active {
            transform: translateY(1px);
          }

          .button:disabled {
            background: var(--border-color);
            cursor: not-allowed;
            transform: none;
            box-shadow: none;
          }

          .error-alert {
            background-color: #ffebee;
            border: 2px solid var(--error-color);
            color: var(--error-color);
            padding: 0.75rem;
            border-radius: 8px;
            margin-bottom: 1rem;
            text-align: center;
            font-size: 0.9rem;
            font-weight: 600;
          }

          /* ==========================
            MENU & DAYS - ESTILO VIDA SANA
          ========================== */
          .menu-container {
            margin-top: 1.5rem;
          }

          .menu-title-main {
            font-family: 'Oswald', sans-serif;
            font-size: 2.5rem;
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--secondary-color);
            text-align: center;
            text-transform: uppercase;
            letter-spacing: 2px;
          }
          
          .weekly-total {
            text-align: center;
            font-size: 1.3rem;
            font-weight: 600;
            color: var(--text-color-medium);
            margin-bottom: 2rem;
            background-color: var(--card-secondary-background);
            padding: 0.5rem 1rem;
            border-radius: 8px;
            display: inline-block;
            margin-left: 50%;
            transform: translateX(-50%);
            border: 2px dashed var(--accent-color);
          }

          .days-container {
            display: flex;
            flex-direction: column;
            gap: 2.5rem;
          }

          .day-card {
            background-color: var(--card-background);
            border-radius: 12px;
            padding: 2rem;
            border: 2px solid var(--secondary-color);
            box-shadow: 0 6px 12px rgba(0,0,0,0.1);
            position: relative;
            overflow: hidden;
          }

          .day-card::before {
            content: '';
            position: absolute;
            top: 0;
            right: 0;
            width: 60px;
            height: 60px;
            background-color: var(--secondary-color);
            border-radius: 0 0 0 60px;
          }

          .day-header {
            text-align: center;
            margin-bottom: 1.5rem;
          }

          .day-title {
            font-family: 'Oswald', sans-serif;
            font-size: 2.2rem;
            font-weight: 700;
            color: var(--primary-color);
            margin-bottom: 0.25rem;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .day-calories {
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--text-color-medium);
          }

          .progress-bar-container {
            height: 12px;
            background-color: var(--card-secondary-background);
            border-radius: 6px;
            margin-top: 0.5rem;
            overflow: hidden;
            border: 1px solid var(--border-color);
          }

          .progress-bar {
            height: 100%;
            transition: width 0.5s ease-in-out;
            border-radius: 6px;
          }

          /* ==========================
            MEALS GRID - ESTILO AÑOS 60
          ========================== */
          .meals-container {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
            gap: 2rem;
            margin-top: 2rem;
            align-items: stretch;
            justify-content: center;
          }

          /* ==========================
            MEAL CARD ENHANCEMENTS - ESTILO RETRO Y DEPORTIVO
          ========================== */
          .meal-card {
            background-color: var(--card-secondary-background);
            border-radius: 12px;
            border: 2px solid var(--border-color);
            overflow: hidden;
            cursor: pointer;
            transition: all 0.3s cubic-bezier(0.25, 0.8, 0.25, 1);
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            box-shadow: 0 4px 8px rgba(0,0,0,0.1);
            position: relative;
            animation: cardAppear 0.5s ease forwards;
          }

          .meal-card:hover {
            transform: translateY(-5px) scale(1.02);
            box-shadow: 0 12px 24px rgba(0,0,0,0.2);
            border-color: var(--primary-color);
          }

          .meal-image-wrapper {
            position: relative;
            width: 100%;
            height: 220px;
            overflow: hidden;
          }

          .meal-image-wrapper::after {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0) 100%);
            transition: opacity 0.3s ease;
            z-index: 10;
          }

          .meal-card:hover .meal-image-wrapper::after {
            opacity: 0.9;
          }

          .meal-image {
            width: 100%;
            height: 100%;
            object-fit: cover;
            transition: transform 0.5s ease;
          }

          .meal-card:hover .meal-image {
            transform: scale(1.05);
          }

          .meal-info-overlay {
            position: absolute;
            bottom: 0;
            left: 0;
            width: 100%;
            padding: 1.5rem;
            z-index: 20;
            color: white;
            display: flex;
            flex-direction: column;
            gap: 0.5rem;
          }

          .meal-name {
            font-family: 'Oswald', sans-serif;
            font-size: 1.6rem;
            font-weight: 700;
            line-height: 1.2;
            text-shadow: 0 2px 4px rgba(0,0,0,0.5);
            letter-spacing: 0.03em;
            text-transform: uppercase;
          }

          .meal-calories {
            font-size: 1.1rem;
            font-weight: 600;
            opacity: 0.9;
            text-shadow: 0 1px 2px rgba(0,0,0,0.5);
          }

          .meal-description {
            font-family: 'Montserrat', sans-serif;
            font-style: italic;
            font-size: 0.95rem;
            padding: 1.5rem;
            color: var(--text-color-medium);
            line-height: 1.5;
            background: var(--card-background);
            flex-grow: 1;
            display: flex;
            align-items: center;
          }

          /* Recipe section enhancements */
          .recipe-toggle-button {
            width: 100%;
            padding: 1rem;
            font-size: 0.95rem;
            color: var(--primary-color);
            background-color: transparent;
            border-radius: 0;
            font-weight: 600;
            text-transform: uppercase;
            transition: all 0.3s;
            border: none;
            border-top: 2px solid var(--border-color);
            cursor: pointer;
            letter-spacing: 0.05em;
            font-family: 'Oswald', sans-serif;
          }

          .recipe-toggle-button:hover {
            background-color: var(--primary-color);
            color: white;
          }

          .recipe-content {
            padding: 0 1.5rem;
            background-color: var(--card-background);
            max-height: 0;
            overflow: hidden;
            transition: max-height 0.5s ease-in-out;
          }

          .recipe-content.expanded {
            max-height: 2000px;
            padding: 1.5rem;
          }

          .recipe-ingredients-list {
            list-style: none;
            padding: 0;
            margin-bottom: 1.5rem;
          }

          .recipe-ingredients-list li {
            padding: 0.25rem 0;
            position: relative;
            padding-left: 1.5rem;
          }

          .recipe-ingredients-list li:before {
            content: "•";
            color: var(--primary-color);
            font-weight: bold;
            position: absolute;
            left: 0;
            font-size: 1.2rem;
          }

          .recipe-ingredients-title, .recipe-preparation-title {
            font-weight: 700;
            margin-bottom: 1rem;
            color: var(--secondary-color);
            font-size: 1.2rem;
            border-bottom: 2px solid var(--secondary-color);
            padding-bottom: 0.5rem;
            font-family: 'Oswald', sans-serif;
            text-transform: uppercase;
            letter-spacing: 1px;
          }

          .recipe-preparation-text {
            white-space: pre-line;
            line-height: 1.6;
          }

          /* Macro info enhancements */
          .macro-info {
            display: flex;
            justify-content: space-around;
            padding: 1rem 0;
            border-top: 2px solid var(--border-color);
            font-size: 0.9rem;
            background: rgba(0,0,0,0.03);
            border-radius: 0 0 10px 10px;
          }

          .macro-item {
            display: flex;
            flex-direction: column;
            align-items: center;
            gap: 0.25rem;
          }

          .macro-value {
            font-weight: 700;
            color: var(--primary-color);
            font-size: 1.1rem;
          }

          .macro-label {
            font-size: 0.8rem;
            color: var(--text-color-medium);
            text-transform: uppercase;
          }

          /* Badge for meal type */
          .meal-type-badge {
            position: absolute;
            top: 1rem;
            right: 1rem;
            background: var(--accent-color);
            color: white;
            padding: 0.35rem 0.75rem;
            border-radius: 20px;
            font-size: 0.8rem;
            font-weight: 600;
            z-index: 30;
            text-transform: uppercase;
            letter-spacing: 0.05em;
            font-family: 'Oswald', sans-serif;
            box-shadow: 0 2px 4px rgba(0,0,0,0.2);
          }

          /* Animation for card appearance */
          @keyframes cardAppear {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }

          /* Delay animation for each card */
          .meal-card:nth-child(1) { animation-delay: 0.1s; }
          .meal-card:nth-child(2) { animation-delay: 0.2s; }
          .meal-card:nth-child(3) { animation-delay: 0.3s; }
          .meal-card:nth-child(4) { animation-delay: 0.4s; }

          /* Hover effect for the entire card */
          .meal-card::before {
            content: '';
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: linear-gradient(135deg, rgba(255, 87, 34, 0.1) 0%, rgba(76, 175, 80, 0.1) 100%);
            opacity: 0;
            transition: opacity 0.3s ease;
            z-index: 5;
          }

          .meal-card:hover::before {
            opacity: 1;
          }

          /* ==========================
            MEDIA QUERIES
          ========================== */
          @media (min-width: 640px) {
            .input-group { 
              flex-direction: row; 
              gap: 1.5rem; 
            }
            
            .button {
              width: auto;
            }
          }
          
          @media (min-width: 1024px) {
            .container { 
              padding: 4rem 2rem; 
            }
            
            .main-card { 
              padding: 3rem; 
            }
          }
        `}
      </style>
      <div className="container">
        <div className="main-card">
          <h1 className="title">El Menú Semanal</h1>
          <p className="motto">Una experiencia culinaria adaptada a tu bienestar</p>
          <div className="input-group">
            <input
              type="number"
              value={objetivo}
              onChange={(e) => setObjetivo(Number(e.target.value))}
              className="input-field"
              placeholder="Objetivo calórico"
            />
            <button
              onClick={generarMenu}
              disabled={loading}
              className="button"
            >
              {loading ? "Generando..." : "Generar Menú"}
            </button>
          </div>

          {error && (
            <div className="error-alert" role="alert">
              <span className="alert-text">{error}</span>
            </div>
          )}

          {menu && (
            <div className="menu-container">
              <h2 className="menu-title-main">Tu Plan Personalizado</h2>
              <p className="weekly-total">
                Total semanal: {calculateWeeklyCalories(menu)} kcal
              </p>
              <div className="days-container">
                {menu.days.map((dayPlan) => (
                  <div key={dayPlan.day} className="day-card">
                    <div className="day-header">
                      <h3 className="day-title">{dayPlan.day}</h3>
                      <span className="day-calories">
                        {calculateDailyCalories(dayPlan)} kcal
                      </span>
                    </div>
                    <div className="progress-bar-container">
                      <div 
                        className="progress-bar" 
                        style={{ 
                          width: `${calculateDailyPercentage(dayPlan)}%`,
                          backgroundColor: getProgressBarColor(calculateDailyPercentage(dayPlan))
                        }}
                      ></div>
                    </div>
                    <div className="meals-container">
                      {dayPlan.meals.map((meal) => (
                        <div key={meal.id} className="meal-card" onClick={() => toggleRecipe(meal.id)}>
                          <span className="meal-type-badge">{meal.type}</span>
                          <div className="meal-image-wrapper">
                            {/* Uso de la imagen como fondo con un overlay para el texto */}
                            <img src={meal.photo} alt={meal.name} className="meal-image" />
                            <div className="meal-info-overlay">
                              <span className="meal-name">{meal.name}</span>
                              <span className="meal-calories">{meal.calories} kcal</span>
                            </div>
                          </div>
                          
                          <p className="meal-description">{meal.description}</p>
                          
                          {/* Contenido de la receta que se despliega */}
                          <div className={`recipe-content ${expandedMealId === meal.id ? 'expanded' : ''}`}>
                            <div className="meal-content">
                                <div className="macro-info">
                                  {meal.protein && <span className="macro-item">
                                    <span className="macro-value">{meal.protein}g</span>
                                    <span className="macro-label">Proteínas</span>
                                  </span>}
                                  {meal.carbs && <span className="macro-item">
                                    <span className="macro-value">{meal.carbs}g</span>
                                    <span className="macro-label">Carbs</span>
                                  </span>}
                                  {meal.fat && <span className="macro-item">
                                    <span className="macro-value">{meal.fat}g</span>
                                    <span className="macro-label">Grasas</span>
                                  </span>}
                                </div>
                                {meal.ingredients && (
                                  <div className="recipe-ingredients">
                                    <h4 className="recipe-ingredients-title">Ingredientes</h4>
                                    <ul className="recipe-ingredients-list">
                                      {meal.ingredients.map((ing, index) => (
                                        <li key={index}><b>{ing.qty}</b> de {ing.item}</li>
                                      ))}
                                    </ul>
                                  </div>
                                )}
                                {meal.recipe && (
                                  <div className="recipe-preparation">
                                    <h4 className="recipe-preparation-title">Preparación</h4>
                                    <p className="recipe-preparation-text">{meal.recipe}</p>
                                  </div>
                                )}
                              </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default App;