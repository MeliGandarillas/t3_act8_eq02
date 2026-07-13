//Talleres
const API_URL =
  "https://6a545ff38547b9f7111c26d6.mockapi.io/talleres";

async function procesarRespuesta(response, mensajeError) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || mensajeError);
  }

  return data;
}

// GET: obtener todos los talleres
export async function getTalleres() {
  const response = await fetch(API_URL);

  return procesarRespuesta(
    response,
    "No se pudieron obtener los talleres."
  );
}

// POST: agregar un nuevo taller
export async function createTaller(taller) {
  const response = await fetch(API_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taller),
  });

  return procesarRespuesta(
    response,
    "No se pudo agregar el taller."
  );
}

// PATCH: editar un taller
export async function updateTaller(id, taller) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(taller),
  });

  return procesarRespuesta(
    response,
    "No se pudo actualizar el taller."
  );
}

// DELETE: eliminar un taller
export async function deleteTaller(id) {
  const response = await fetch(`${API_URL}/${id}`, {
    method: "DELETE",
  });

  return procesarRespuesta(
    response,
    "No se pudo eliminar el taller."
  );
}
//Talleres