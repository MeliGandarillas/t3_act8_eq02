// API que contiene el catálogo original de talleres.
const TALLERES_API_URL =
  "https://6a545ff38547b9f7111c26d6.mockapi.io/talleres";

// DummyJSON permite realizar POST, PATCH y DELETE reales,
// pero no guarda permanentemente los cambios.
// Por eso, al recargar la página, vuelven los datos originales.
const CRUD_SIMULATION_URL = "https://dummyjson.com/products";

async function procesarRespuesta(response, mensajeError) {
  const data = await response.json().catch(() => null);

  if (!response.ok) {
    throw new Error(data?.message || mensajeError);
  }

  return data;
}

function convertirTallerAProducto(taller) {
  return {
    title: taller.nombreTaller,
    description: `Responsable: ${taller.responsable}`,
    category: taller.especialidad,
    rating: taller.resenia,
    nombreTaller: taller.nombreTaller,
    responsable: taller.responsable,
    especialidad: taller.especialidad,
    ubicacion: taller.ubicacion,
    resenia: taller.resenia,
  };
}

// READ: obtiene los talleres originales desde MockAPI.
export async function getTalleres() {
  const response = await fetch(TALLERES_API_URL);

  return procesarRespuesta(
    response,
    "No se pudieron obtener los talleres."
  );
}

// CREATE: realiza un POST real,
// pero el nuevo taller solo se guarda en el estado local de React.
export async function createTaller(taller) {
  const response = await fetch(`${CRUD_SIMULATION_URL}/add`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(convertirTallerAProducto(taller)),
  });

  const respuestaApi = await procesarRespuesta(
    response,
    "No se pudo agregar el taller."
  );

  return {
    ...taller,

    // Se genera un ID temporal para usarlo únicamente
    // mientras la página permanezca abierta.
    id: `local-${respuestaApi.id}-${Date.now()}`,
  };
}

// UPDATE: realiza un PATCH real,
// pero la edición solo se refleja en el estado local.
export async function updateTaller(id, taller) {
  const response = await fetch(`${CRUD_SIMULATION_URL}/1`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(convertirTallerAProducto(taller)),
  });

  await procesarRespuesta(
    response,
    "No se pudo actualizar el taller."
  );

  return {
    ...taller,
    id,
  };
}

// DELETE: realiza una petición DELETE real,
// pero la eliminación solo se refleja en el estado local.
export async function deleteTaller() {
  const response = await fetch(`${CRUD_SIMULATION_URL}/1`, {
    method: "DELETE",
  });

  return procesarRespuesta(
    response,
    "No se pudo eliminar el taller."
  );
}