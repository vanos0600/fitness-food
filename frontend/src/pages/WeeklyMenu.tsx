import { useState } from "react";
import { fetchMenu } from "../lib/api";

function WeeklyMenu() {
  const [objetivo, setObjetivo] = useState(2100);
  const [menu, setMenu] = useState<any>(null);

  const generarMenu = async () => {
    try {
      const data = await fetchMenu(objetivo);
      setMenu(data);
    } catch (err) {
      alert("No se pudo conectar con el servidor. Asegúrate de que el backend esté ejecutándose.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">Establece tu objetivo calórico</h1>
      <input
        type="number"
        value={objetivo}
        onChange={(e) => setObjetivo(Number(e.target.value))}
        className="border rounded p-2 mr-2"
      />
      <button
        onClick={generarMenu}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        Generar Menú
      </button>

      {menu && (
        <pre className="mt-4 bg-gray-100 p-4 rounded">
          {JSON.stringify(menu, null, 2)}
        </pre>
      )}
    </div>
  );
}

export default WeeklyMenu;
