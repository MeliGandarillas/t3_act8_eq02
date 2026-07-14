# Manos de Oaxaca — Panel administrativo ARIPO

Actividad 8 — Sistema web con React, consumo de APIs y despliegue en VPS.

Back-office administrativo para ARIPO (Artesanías e Industrias Populares de Oaxaca). El sistema permite al personal de la institución iniciar sesión, consultar, filtrar y administrar el catálogo de talleres y experiencias artesanales de comunidades oaxaqueñas.

## Equipo (Equipo 02)

* Caballero Silva Dalia Montserrat
* Gandarillas Melissa

## Enlaces

* Repositorio: https://github.com/MeliGandarillas/t3_act8_eq02
* Proyecto desplegado: http://54.83.75.25/t3_act8_eq02/

## Stack tecnológico

* **Frontend:** React 19 + Vite
* **Enrutamiento:** React Router DOM
* **Estilos:** CSS puro, con una paleta cálida inspirada en textiles, barro y artesanías oaxaqueñas
* **Servidor:** Nginx sobre una instancia de AWS EC2 con Ubuntu
* **Control de versiones:** Git y GitHub

## APIs consumidas

### Autenticación

Se utiliza **DummyJSON Auth** para simular el inicio de sesión del personal administrativo.

* Endpoint: https://dummyjson.com/auth/login
* Método: `POST`

Ejemplo de credenciales válidas:

```text
Usuario: emilys
Contraseña: emilyspass
```

### Catálogo de talleres

Se utiliza **MockAPI** para consultar y administrar los registros de los talleres artesanales.

* Endpoint: https://6a545ff38547b9f7111c26d6.mockapi.io/talleres
* Métodos utilizados:

  * `GET`: obtener los talleres
  * `POST`: agregar un taller
  * `PATCH`: editar un taller
  * `DELETE`: eliminar un taller

Las llamadas a las APIs se encuentran separadas de los componentes en:

```text
src/services/authService.js
src/services/api.js
```

## Funcionalidades

### Login

* Formulario con campos de usuario y contraseña.
* Validación para evitar el envío de campos vacíos.
* Petición real de autenticación a DummyJSON.
* Mensaje de error claro cuando las credenciales son incorrectas.
* Almacenamiento de los datos del usuario autenticado en el estado de React.
* Persistencia de la sesión mediante `localStorage`.
* Recuperación automática de la sesión al recargar la página.

### Protección del sistema

La vista administrativa se protege mediante renderizado condicional en `App.jsx`.

Cuando no existe un usuario autenticado en el estado, solamente se muestra `LoginPage`. Cuando existe una sesión activa, se muestra `DataPage`.

Al cerrar sesión se elimina el usuario de `localStorage`, se limpia el estado y se regresa al formulario de login.

### Layout administrativo

* Navbar con fotografía y nombre del usuario autenticado.
* Botón para cerrar sesión.
* Sidebar con diferentes opciones de navegación.
* Vista de panel de bienvenida.
* Sección de talleres con tabla interactiva.
* Opciones adicionales simuladas para completar la navegación lateral.

### Catálogo de talleres

* Consulta de datos desde MockAPI.
* Tabla con los siguientes campos:

  * ID
  * Nombre del taller
  * Responsable
  * Especialidad
  * Ubicación
  * Reseña
  * Acciones
* Filtro de texto por nombre del taller o responsable.
* Filtro por especialidad.
* Filtro por ubicación.
* Mensaje cuando no se encuentran resultados.
* Indicador de carga durante la petición.
* Mensaje legible cuando ocurre un error de red.

### Paginación

* Controles para avanzar y regresar entre páginas.
* Selector de cantidad de registros por página:

  * 10
  * 20
  * 40
  * 50
* Página y límite reflejados en la URL mediante parámetros:

```text
?page=2&limit=20
```

* La paginación utiliza `useSearchParams` de React Router DOM.
* Al cambiar un filtro se regresa automáticamente a la primera página.
* La URL puede compartirse y permite utilizar los botones de avanzar y regresar del navegador.

### CRUD

#### Agregar

* Formulario para registrar un nuevo taller.
* Validación de campos obligatorios.
* Validación de la reseña dentro del rango de 1 a 5.
* Petición real `POST` a MockAPI.
* Actualización del estado local con `useState`.
* Mensaje de confirmación al completar la operación.

#### Editar

* Botón de edición en cada registro.
* Mensaje de confirmación antes de abrir el formulario.
* Formulario precargado con la información del taller.
* Petición real `PATCH` a MockAPI.
* Sustitución del registro actualizado en el estado local.
* Mensaje de confirmación al completar la operación.

#### Eliminar

* Botón de eliminación en cada registro.
* Mensaje de confirmación antes de eliminar.
* Petición real `DELETE` a MockAPI.
* Eliminación del registro del estado local.
* Mensaje de confirmación al completar la operación.

## Validaciones y manejo de errores

* Validación de campos vacíos en el login.
* Validación de campos obligatorios en el formulario de talleres.
* Validación numérica de la reseña.
* Mensajes de error visibles para el usuario.
* Botones deshabilitados mientras una operación se está procesando.
* Manejo de errores de las peticiones mediante `try`, `catch` y mensajes personalizados.
* Uso de un componente de carga reutilizable.

## Estructura del proyecto

```text
src/
├── components/
│   ├── DataFilters.jsx
│   ├── DataForm.jsx
│   ├── DataTable.jsx
│   ├── DialogoConfirmacion.jsx
│   ├── Loading.jsx
│   ├── Modal.jsx
│   ├── Navbar.jsx
│   ├── Pagination.jsx
│   └── Sidebar.jsx
├── pages/
│   ├── DataPage.jsx
│   └── LoginPage.jsx
├── services/
│   ├── api.js
│   └── authService.js
├── styles/
│   ├── global.css
│   ├── layout.css
│   ├── loading.css
│   ├── login.css
│   ├── modal.css
│   └── table.css
├── App.jsx
└── main.jsx
```

## Organización del código

* Las llamadas de autenticación se encuentran en `src/services/authService.js`.
* Las llamadas CRUD de talleres se encuentran en `src/services/api.js`.
* La interfaz está dividida en componentes reutilizables.
* La página principal administra los filtros, la paginación y el estado local.
* Los nombres de funciones y variables describen claramente su propósito.
* Los errores se muestran en pantalla y no solamente en la consola.

## Instalación y ejecución local

Clonar el repositorio:

```bash
git clone https://github.com/MeliGandarillas/t3_act8_eq02.git
```

Entrar a la carpeta del proyecto:

```bash
cd t3_act8_eq02
```

Instalar las dependencias:

```bash
npm install
```

Iniciar el servidor de desarrollo:

```bash
npm run dev
```

## Comprobación del proyecto

Ejecutar ESLint:

```bash
npm run lint
```

Generar el build de producción:

```bash
npm run build
```

La carpeta generada para producción es:

```text
dist/
```

## Despliegue en el VPS

El archivo `vite.config.js` contiene la ruta base:

```js
base: "/t3_act8_eq02/",
```

Después de ejecutar:

```bash
npm run build
```

se debe subir el contenido de la carpeta `dist` a la carpeta correspondiente del servidor Nginx.

La aplicación desplegada se encuentra en:

http://54.83.75.25/t3_act8_eq02/

## Git y trabajo colaborativo

El proyecto se desarrolla en equipo mediante Git y GitHub.

Se realizan commits descriptivos y frecuentes para reflejar el avance de cada integrante, por ejemplo:

```bash
git add .
git commit -m "Implementar CRUD de talleres"
git push origin main
```

El archivo `.gitignore` evita subir carpetas y archivos innecesarios, como:

```text
node_modules/
dist/
.env
```

::: 
