const API_URL =
  "https://6a545ff38547b9f7111c26d6.mockapi.io/talleres";

const talleres = [
  {
    nombreTaller: "Barro Negro Coyotepec",
    responsable: "Rosa Díaz Ruiz",
    especialidad: "Barro negro",
    ubicacion: "San Bartolo Coyotepec",
    resenia: 4.8,
  },
  {
    nombreTaller: "Raíces de Barro",
    responsable: "María López García",
    especialidad: "Barro negro",
    ubicacion: "San Bartolo Coyotepec",
    resenia: 4.6,
  },
  {
    nombreTaller: "Manos de Tierra",
    responsable: "Juana Hernández Ruiz",
    especialidad: "Barro negro",
    ubicacion: "San Bartolo Coyotepec",
    resenia: 4.9,
  },
  {
    nombreTaller: "Tradición de Coyotepec",
    responsable: "Elena García Méndez",
    especialidad: "Barro negro",
    ubicacion: "San Bartolo Coyotepec",
    resenia: 4.7,
  },
  {
    nombreTaller: "Alebrijes Tilcajete",
    responsable: "José Ramírez Cruz",
    especialidad: "Alebrijes",
    ubicacion: "San Martín Tilcajete",
    resenia: 4.7,
  },
  {
    nombreTaller: "Sueños de Copal",
    responsable: "Manuel Santiago Pérez",
    especialidad: "Alebrijes",
    ubicacion: "San Martín Tilcajete",
    resenia: 4.9,
  },
  {
    nombreTaller: "Colores de Oaxaca",
    responsable: "Elena Martínez López",
    especialidad: "Alebrijes",
    ubicacion: "San Antonio Arrazola",
    resenia: 4.8,
  },
  {
    nombreTaller: "Figuras del Monte",
    responsable: "Pedro Vásquez Ruiz",
    especialidad: "Alebrijes",
    ubicacion: "San Antonio Arrazola",
    resenia: 4.5,
  },
  {
    nombreTaller: "Copal Mágico",
    responsable: "Miguel Hernández Díaz",
    especialidad: "Alebrijes",
    ubicacion: "San Martín Tilcajete",
    resenia: 4.6,
  },
  {
    nombreTaller: "Telares del Valle",
    responsable: "Carmen Bautista Díaz",
    especialidad: "Tapetes",
    ubicacion: "Teotitlán del Valle",
    resenia: 4.9,
  },
  {
    nombreTaller: "Grecas Zapotecas",
    responsable: "Antonio Cruz García",
    especialidad: "Tapetes",
    ubicacion: "Teotitlán del Valle",
    resenia: 4.8,
  },
  {
    nombreTaller: "Lana y Tradición",
    responsable: "Francisco Mendoza Ruiz",
    especialidad: "Tapetes",
    ubicacion: "Teotitlán del Valle",
    resenia: 4.7,
  },
  {
    nombreTaller: "Hilos de Teotitlán",
    responsable: "Beatriz Chávez López",
    especialidad: "Tapetes",
    ubicacion: "Teotitlán del Valle",
    resenia: 4.9,
  },
  {
    nombreTaller: "Hilos de Oaxaca",
    responsable: "Teresa Aquino López",
    especialidad: "Textiles",
    ubicacion: "Santo Tomás Jalieza",
    resenia: 4.8,
  },
  {
    nombreTaller: "Bordados del Valle",
    responsable: "Lucía Jiménez Pérez",
    especialidad: "Textiles",
    ubicacion: "Santo Tomás Jalieza",
    resenia: 4.6,
  },
  {
    nombreTaller: "Huipiles del Istmo",
    responsable: "Margarita Sánchez Cruz",
    especialidad: "Textiles",
    ubicacion: "Juchitán de Zaragoza",
    resenia: 4.9,
  },
  {
    nombreTaller: "Flor Istmeña",
    responsable: "Dolores Morales Díaz",
    especialidad: "Textiles",
    ubicacion: "Santo Domingo Tehuantepec",
    resenia: 4.7,
  },
  {
    nombreTaller: "Bordados de Jalieza",
    responsable: "Andrea Jiménez Ruiz",
    especialidad: "Textiles",
    ubicacion: "Santo Tomás Jalieza",
    resenia: 4.8,
  },
  {
    nombreTaller: "Palma Mixteca",
    responsable: "Soledad Ortiz Reyes",
    especialidad: "Palma",
    ubicacion: "Heroica Ciudad de Tlaxiaco",
    resenia: 4.5,
  },
  {
    nombreTaller: "Tejidos de Palma",
    responsable: "Alberto Reyes López",
    especialidad: "Palma",
    ubicacion: "Asunción Nochixtlán",
    resenia: 4.6,
  },
  {
    nombreTaller: "Canastas del Sur",
    responsable: "Patricia Flores Ruiz",
    especialidad: "Palma",
    ubicacion: "Ocotlán de Morelos",
    resenia: 4.8,
  },
  {
    nombreTaller: "Palma y Tradición",
    responsable: "Claudia Ortiz García",
    especialidad: "Palma",
    ubicacion: "Heroica Ciudad de Tlaxiaco",
    resenia: 4.7,
  },
  {
    nombreTaller: "Madera Tradicional",
    responsable: "Roberto Aguilar Cruz",
    especialidad: "Madera tallada",
    ubicacion: "Oaxaca de Juárez",
    resenia: 4.7,
  },
  {
    nombreTaller: "Máscaras del Valle",
    responsable: "Eduardo Luna Pérez",
    especialidad: "Madera tallada",
    ubicacion: "Ocotlán de Morelos",
    resenia: 4.6,
  },
  {
    nombreTaller: "Arte en Madera",
    responsable: "Claudia Ramos García",
    especialidad: "Madera tallada",
    ubicacion: "Tlacolula de Matamoros",
    resenia: 4.8,
  },
  {
    nombreTaller: "Madera de los Valles",
    responsable: "Salvador Méndez Ruiz",
    especialidad: "Madera tallada",
    ubicacion: "Tlacolula de Matamoros",
    resenia: 4.5,
  },
  {
    nombreTaller: "Cerámica Atzompa",
    responsable: "Gabriela Torres Ruiz",
    especialidad: "Cerámica",
    ubicacion: "Santa María Atzompa",
    resenia: 4.9,
  },
  {
    nombreTaller: "Barro Verde",
    responsable: "Isabel Romero Díaz",
    especialidad: "Cerámica",
    ubicacion: "Santa María Atzompa",
    resenia: 4.7,
  },
  {
    nombreTaller: "Tierra y Fuego",
    responsable: "Alejandra Silva Cruz",
    especialidad: "Cerámica",
    ubicacion: "Santa María Atzompa",
    resenia: 4.8,
  },
  {
    nombreTaller: "Cerámica del Valle",
    responsable: "Daniela Pérez López",
    especialidad: "Cerámica",
    ubicacion: "Santa María Atzompa",
    resenia: 4.6,
  },
  {
    nombreTaller: "Filigrana del Istmo",
    responsable: "Daniela Ortiz López",
    especialidad: "Joyería",
    ubicacion: "Santo Domingo Tehuantepec",
    resenia: 4.9,
  },
  {
    nombreTaller: "Joyas de Oaxaca",
    responsable: "Salvador Reyes Cruz",
    especialidad: "Joyería",
    ubicacion: "Oaxaca de Juárez",
    resenia: 4.6,
  },
  {
    nombreTaller: "Plata del Centro",
    responsable: "Mariana Torres Díaz",
    especialidad: "Joyería",
    ubicacion: "Oaxaca de Juárez",
    resenia: 4.8,
  },
  {
    nombreTaller: "Hojalata Oaxaqueña",
    responsable: "Ricardo Méndez López",
    especialidad: "Hojalata",
    ubicacion: "Oaxaca de Juárez",
    resenia: 4.7,
  },
  {
    nombreTaller: "Faroles del Sur",
    responsable: "Gabriel Cruz Ruiz",
    especialidad: "Hojalata",
    ubicacion: "Ocotlán de Morelos",
    resenia: 4.5,
  },
  {
    nombreTaller: "Arte de Metal",
    responsable: "Felipe Morales García",
    especialidad: "Hojalata",
    ubicacion: "Oaxaca de Juárez",
    resenia: 4.6,
  },
  {
    nombreTaller: "Cestería del Valle",
    responsable: "Rocío Hernández Cruz",
    especialidad: "Cestería",
    ubicacion: "Tlacolula de Matamoros",
    resenia: 4.8,
  },
  {
    nombreTaller: "Fibras de Oaxaca",
    responsable: "Alma Reyes Martínez",
    especialidad: "Cestería",
    ubicacion: "Ocotlán de Morelos",
    resenia: 4.7,
  },
  {
    nombreTaller: "Manos Tejedoras",
    responsable: "Josefina López Ruiz",
    especialidad: "Cestería",
    ubicacion: "Asunción Nochixtlán",
    resenia: 4.9,
  },
  {
    nombreTaller: "Tradición Mixteca",
    responsable: "Carlos Santiago Díaz",
    especialidad: "Cestería",
    ubicacion: "Heroica Ciudad de Tlaxiaco",
    resenia: 4.6,
  },
];

async function obtenerTalleres() {
  const response = await fetch(API_URL);

  if (!response.ok) {
    throw new Error("No se pudieron consultar los talleres.");
  }

  return response.json();
}

async function eliminarTalleresAnteriores() {
  const talleresAnteriores = await obtenerTalleres();

  for (const taller of talleresAnteriores) {
    const response = await fetch(`${API_URL}/${taller.id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(
        `No se pudo eliminar el taller con ID ${taller.id}.`
      );
    }

    console.log(`Eliminado: ${taller.id}`);
  }
}

async function agregarTalleres() {
  for (const taller of talleres) {
    const response = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(taller),
    });

    if (!response.ok) {
      throw new Error(
        `No se pudo agregar el taller ${taller.nombreTaller}.`
      );
    }

    console.log(`Agregado: ${taller.nombreTaller}`);
  }
}

async function cargarTalleres() {
  try {
    console.log("Eliminando registros anteriores...");

    await eliminarTalleresAnteriores();

    console.log("Agregando talleres artesanos...");

    await agregarTalleres();

    console.log(
      `Proceso terminado. Se agregaron ${talleres.length} talleres.`
    );
  } catch (error) {
    console.error("Error:", error.message);
  }
}

cargarTalleres();