🥗 Fitness Menu SaaS

Generador de menús semanales saludables basado en objetivos calóricos, desarrollado con **React + Vite + Tailwind** en el frontend y **FastAPI** en el backend.



🚀 Características

- ✅ Generación automática de menús semanales según un objetivo calórico diario.  
- ✅ Base de datos de comidas en formato JSON.  
- ✅ Frontend moderno con **React + TailwindCSS**.  
- ✅ Backend rápido y escalable con **FastAPI**.  
- ✅ API REST para consultar menús semanales.  



 🏗️ Estructura del proyecto

fitness-menu-saas/
│── backend/ # Backend con FastAPI
│ ├── app/
│ │ ├── main.py # Punto de entrada de la API
│ │ ├── utils.py # Lógica para generar menús
│ ├── data/meals.json # Base de datos de comidas
│
│── frontend/ # Frontend con React + Vite
│ ├── src/
│ │ ├── pages/ # Páginas
│ │ ├── components/ # Componentes UI
│ │ ├── lib/ # Lógica compartida
│ │ ├── main.tsx # Entrada principal
│ ├── index.html
│ ├── tailwind.config.js
│
│── README.md

yaml
Copy code



⚙️ Instalación y ejecución local

🔹 Backend (FastAPI)

1. Clona el repositorio:
   ```bash
   git clone https://github.com/TU-USUARIO/fitness-menu-saas.git
   cd fitness-menu-saas/backend
Crea un entorno virtual e instala dependencias:

bash
Copy code
py -m venv venv
venv\Scripts\activate   # En Windows
pip install -r requirements.txt
Inicia el servidor:

bash
Copy code
uvicorn app.main:app --reload --port 8000
📍 El backend estará disponible en: http://127.0.0.1:8000

🔹 Frontend (React + Vite)
Ve a la carpeta del frontend:

bash
Copy code
cd ../frontend
Instala dependencias:

bash
Copy code
npm install
Inicia el servidor de desarrollo:

bash
Copy code
npm run dev
📍 El frontend estará en: http://localhost:5173

🌍 Deploy
🔹 Backend (Railway / Render / Fly.io)
Sube la carpeta backend/ con un requirements.txt.

Configura el start command:

bash
Copy code
uvicorn app.main:app --host 0.0.0.0 --port $PORT
🔹 Frontend (Vercel / Netlify)
Sube la carpeta frontend/.

Configura el build:

bash
Copy code
npm run build
Directorio de salida: dist

📌 Endpoints principales
GET /menu-semanal?objetivo=2000
Genera un menú semanal con un objetivo de 2000 calorías diarias.

Ejemplo de respuesta:

json
Copy code
{
  "meta": {
    "objetivo": 2000
  },
  "days": [
    {
      "day": "Lunes",
      "meals": [
        { "name": "Ensalada de pollo", "calories": 450 },
        { "name": "Salmón al horno", "calories": 600 }
      ]
    }
  ]
}
👨‍💻 Tecnologías usadas
Frontend: React + Vite + TypeScript + TailwindCSS

Backend: FastAPI + Python

Base de datos: JSON (meals.json)

Deploy: Vercel (Frontend) + Railway/Render (Backend)

✨ Autor
👤 Oskar Vanegas
📧 Contacto: vanegaso045@gmail.com


⭐ ¡Si te gusta este proyecto, dale una estrella en GitHub!

