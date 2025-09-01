import React, { useState } from "react";

const WeeklyMenu: React.FC = () => {
  const [objetivo, setObjetivo] = useState(2100);
  const [menu, setMenu] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchMenu = async () => {
    try {
      const res = await fetch(`http://localhost:8000/menu-semanal?objetivo=${objetivo}`);
      if (!res.ok) throw new Error("Error al obtener el menú");
      const data = await res.json();
      setMenu(data);
      setError(null);
    } catch (err) {
      setError("No se pudo conectar con el servidor. Asegúrate de que el backend esté ejecutándose.");
    }
  };

  return (
    <div>
      <h2>Establece tu objetivo calórico</h2>
      <input
        type="number"
        value={objetivo}
        onChange={(e) => setObjetivo(Number(e.target.value))}
      />
      <button onClick={fetchMenu}>Generar Menú</button>

      {error && <p>{error}</p>}
      {menu && (
        <pre>{JSON.stringify(menu, null, 2)}</pre>
      )}
    </div>
  );
};

export default WeeklyMenu;
