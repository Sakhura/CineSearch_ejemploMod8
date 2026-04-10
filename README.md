# Buscar Series con API REST — CineSearch

Proyecto educativo que consume la API publica de **TVMaze** para buscar series y mostrar su detalle. Construido con HTML, CSS y JavaScript puro + Bootstrap 5.

---

## Estructura del proyecto

```
cinesearch/
├── index.html    → Estructura de la pagina (HTML)
├── styles.css    → Estilos visuales (CSS)
├── app.js        → Logica y llamadas a la API (JavaScript)
└── README.md     → Este archivo
```

---

## API utilizada

**TVMaze API** — Gratuita, sin registro, sin API Key.

| Endpoint | Descripcion |
|---|---|
| `GET /search/shows?q={nombre}` | Buscar series por nombre |
| `GET /shows/{id}` | Obtener detalle de una serie |

**URL base:**
```
https://api.tvmaze.com
```

**Ejemplo de respuesta al buscar:**
```json
[
  {
    "score": 0.9,
    "show": {
      "id": 169,
      "name": "Breaking Bad",
      "genres": ["Drama", "Crime"],
      "rating": { "average": 9.3 },
      "image": { "medium": "https://..." },
      "summary": "<p>Un profesor de quimica...</p>"
    }
  }
]
```

---

## Como ejecutar el proyecto

### Requisitos
- Un navegador moderno (Chrome, Firefox, Edge)
- Conexion a internet para consumir la API

### Pasos
1. Descarga los 3 archivos en la misma carpeta
2. Abre `index.html` en tu navegador
3. Escribe el nombre de una serie y presiona **Enter** o el boton de busqueda

> Los 3 archivos deben estar en la **misma carpeta** para que las rutas relativas funcionen.

---

## Conceptos de API REST aplicados

### 1. Metodo HTTP GET
Todas las peticiones son de tipo `GET` porque solo estamos **leyendo** datos del servidor.

```js
const response = await fetch('https://api.tvmaze.com/search/shows?q=breaking+bad');
```

### 2. Parametros en la URL (Query String)
El texto de busqueda se envia como parametro en la URL:
```
/search/shows?q=breaking bad
              ↑
         parametro "q"
```

### 3. Respuesta JSON
La API devuelve datos en formato JSON, que convertimos a un objeto JavaScript:
```js
const data = await response.json();
```

### 4. Verificacion del estado HTTP
Comprobamos si la respuesta fue exitosa antes de procesar los datos:
```js
if (!response.ok) {
  throw new Error(`Error HTTP: ${response.status}`);
}
```

### 5. Manejo de errores
Siempre usamos `try/catch` para capturar errores de red o del servidor:
```js
try {
  const response = await fetch(url);
  const data = await response.json();
} catch (error) {
  console.error('Error:', error);
}
```

---

## Flujo de la aplicacion

```
El usuario escribe y presiona Enter
        ↓
app.js llama a buscarSeries()
        ↓
fetch() → GET /search/shows?q={query}
        ↓
La API responde con JSON (lista de series)
        ↓
mostrarResultados() genera las cards en el HTML
        ↓
El usuario hace click en una card
        ↓
fetch() → GET /shows/{id}
        ↓
La API responde con JSON (detalle del show)
        ↓
El modal de Bootstrap muestra el detalle
```

---

## Tecnologias utilizadas

| Tecnologia | Version | Uso |
|---|---|---|
| HTML5 | — | Estructura de la pagina |
| CSS3 | — | Estilos y animaciones |
| JavaScript | ES2020+ | Logica y fetch API |
| Bootstrap | 5.3.3 | Grid, Modal y utilidades |
| TVMaze API | v1 | Fuente de datos |
| Google Fonts | — | Tipografias (Bebas Neue, DM Sans) |

---

## Posibles mejoras

- [ ] Filtrar resultados por genero
- [ ] Guardar series favoritas con `localStorage`
- [ ] Paginacion de resultados
- [ ] Busqueda en tiempo real sin necesidad del boton
- [ ] Seccion de series populares al cargar la pagina

---

## Recursos para aprender mas

- [Documentacion TVMaze API](https://www.tvmaze.com/api)
- [MDN — fetch()](https://developer.mozilla.org/es/docs/Web/API/Fetch_API/Using_Fetch)
- [MDN — async/await](https://developer.mozilla.org/es/docs/Learn/JavaScript/Asynchronous/Promises)
- [Bootstrap 5 Docs](https://getbootstrap.com/docs/5.3/)

---

Proyecto educativo para aprender el consumo de APIs REST con JavaScript vanilla.