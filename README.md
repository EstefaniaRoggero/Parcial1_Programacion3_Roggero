 # API REST de Recetas

Proyecto realizado para Programación III.

El sistema permite administrar recetas utilizando una API REST creada con Node.js, Express y MySQL, consumida desde un frontend realizado con HTML, CSS y JavaScript vanilla.


# Tecnologías utilizadas

## Backend
- Node.js
- Express.js
- MySQL
- mysql2
- cors

## Frontend
- HTML5
- CSS3
- JavaScript Vanilla
- Fetch API


#  Funcionalidades

El sistema permite:

✅ Mostrar todas las las recetas  
✅ Buscar recetas por ID  
✅ Buscar recetas por nombre  
✅ Buscar recetas por dificultad  
✅ Crear nuevas recetas  
✅ Modificar recetas existentes  
✅ Eliminar recetas  



# Configuración de conexión MySQL

```js
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bd_recetas"
});
```


# Script SQL

```sql
CREATE TABLE recetas (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nombre VARCHAR(100),
    categoria VARCHAR(50),
    tiempo INT,
    dificultad VARCHAR(50),
    ingredientes TEXT,
    preparacion TEXT
);
```


# Estructura del proyecto

```bash
Parcial_API_Roggero/
│
├── frontend/
│   ├── index.html
│   ├── style.css
│   └── app.js
│
├── api_recetas.js
├── package.json
└── README.md
```

# Ejecutar el proyecto

Instalar dependencias:

```bash
npm install
```

Ejecutar servidor:

```bash
node api_recetas.js
```

Abrir en navegador:

```txt
http://localhost:3000
```