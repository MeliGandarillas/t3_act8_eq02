# Manos de Oaxaca — Panel administrativo ARIPO

Actividad 8 — Sistema web con React, consumo de APIs y despliegue en VPS.

Back-office administrativo para ARIPO (Artesanías e Industrias Populares de
Oaxaca): permite al personal de la institución validar y gestionar el
catálogo de talleres y experiencias de los artesanos de las comunidades
oaxaqueñas.

## Equipo (Equipo 02)

- Caballero Silva Dalia Montserrat 
- Gandarillas Melissa

## Enlaces

- Repositorio: `https://github.com/MeliGandarillas/t3_act8_eq02`
- Proyecto desplegado: http://54.83.75.25/t3_act8_eq02/

## Stack

- **Frontend:** React + Vite
- **Enrutamiento:** react-router-dom (paginación con estado reflejado en la URL)
- **Estilos:** CSS puro, paleta cálida inspirada en textiles y barro oaxaqueño
- **Servidor:** Nginx sobre una instancia de AWS EC2 (Ubuntu)

## APIs consumidas

- **Autenticación:** [DummyJSON Auth](https://dummyjson.com/auth/login) — login del personal administrativo
- **Catálogo de talleres:** [MockAPI](https://6a545ff38547b9f7111c26d6.mockapi.io/talleres) — consulta y administración de los registros de talleres mediante peticiones GET, POST, PUT y DELETE

## Funcionalidades

**Login**
- Formulario con validación de campos vacíos antes de enviar la petición
- Mensaje de error claro si las credenciales son incorrectas
- Sesión persistida para no perder el login al recargar la página

**Layout y protección**
- Navbar con foto y nombre del usuario autenticado, y botón de cerrar sesión
- Sidebar con navegación entre secciones
- La vista del panel no es accesible sin una sesión activa; la protección se realiza mediante renderizado condicional en `App.jsx`, utilizando el estado del usuario y `localStorage`

**Catálogo de talleres**
- Tabla con filtro de texto y filtro por categoría/ubicación
- Paginación con selector de registros por página, reflejada en la URL (`?page=`, `?limit=`)
- Indicador de carga y manejo de errores de red

**CRUD**
- Agregar, editar y eliminar registros del catálogo
- Confirmación previa antes de editar o eliminar
- Cada acción hace una petición real a la API antes de actualizar el estado local

## Estructura del proyecto

```
src/
├── components/    # Navbar, Sidebar, Modal, DialogoConfirmacion, DataForm, DataTable, DataFilters, Pagination, Loading
├── pages/         # LoginPage, DataPage
├── services/      # authService.js, api.js
├── styles/        # global.css, layout.css, login.css, modal.css, table.css, loading.css
├── App.jsx
└── main.jsx
```

## Despliegue

```bash
npm run build
```

El `base` en `vite.config.js` está configurado como `/t3_act8_eq02/` para
que las rutas coincidan con la carpeta servida por Nginx en el VPS.
