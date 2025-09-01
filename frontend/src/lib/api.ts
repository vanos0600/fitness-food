// frontend/src/lib/api.ts
export async function fetchMenu(objetivo: number) {
  const res = await fetch(`http://127.0.0.1:8000/menu-semanal?objetivo=${objetivo}`);
  if (!res.ok) {
    throw new Error("Error en la API");
  }
  return res.json();
}
