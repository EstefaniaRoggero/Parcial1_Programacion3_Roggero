// ================= MOSTRAR TODAS =================

async function cargarRecetas() {

    const respuesta = await fetch("http://localhost:3000/recetas");

    const data = await respuesta.json();

    mostrarRecetas(data);

}

// ================= BOTON MOSTRAR TODO =================

document.getElementById("btn-mostrar")
.addEventListener("click", cargarRecetas);


// ================= ELIMINAR =================

async function eliminarReceta(id){

    const confirmar = confirm("¿Eliminar receta?");

    if(!confirmar) return;

    await fetch(`http://localhost:3000/recetas/${id}`,{
        method: "DELETE"
    });

    alert("Receta eliminada");

    cargarRecetas();

}


// ================= CARGAR DATOS PARA EDITAR =================

async function editarReceta(id){

    const respuesta = await fetch(`http://localhost:3000/recetas/${id}`);

    const data = await respuesta.json();

    const receta = data[0];

    document.getElementById("receta-id-editar").value = receta.id;

    document.getElementById("nombre").value = receta.nombre;

    document.getElementById("categoria").value = receta.categoria;

    document.getElementById("tiempo").value = receta.tiempo;

    document.getElementById("dificultad").value = receta.dificultad;

    document.getElementById("ingredientes").value = receta.ingredientes;

    document.getElementById("preparacion").value = receta.preparacion;

    document.getElementById("btn-guardar").innerText = "Guardar cambios";

}


// ================= MOSTRAR EN PANTALLA =================

function mostrarRecetas(recetas) {

    const resultado = document.getElementById("resultado");

    resultado.innerHTML = "";

    if (recetas.length === 0) {

        resultado.innerHTML = "<p>No se encontraron recetas</p>";
        return;

    }

    recetas.forEach(receta => {

        resultado.innerHTML += `

            <div class="card">

                <h3>${receta.nombre}</h3>

                <p><strong>ID:</strong> ${receta.id}</p>

                <p><strong>Categoría:</strong> ${receta.categoria}</p>

                <p><strong>Tiempo:</strong> ${receta.tiempo} min</p>

                <p><strong>Dificultad:</strong> ${receta.dificultad}</p>

                <p><strong>Ingredientes:</strong> ${receta.ingredientes}</p>

                <p><strong>Preparación:</strong> ${receta.preparacion}</p>

                <div class="acciones">

                    <button onclick="editarReceta(${receta.id})">
                        Modificar
                    </button>

                    <button onclick="eliminarReceta(${receta.id})">
                        Eliminar
                    </button>

                </div>

            </div>

        `;

    });

}


// ================= BUSCAR POR ID =================

document.getElementById("form-id").addEventListener("submit", async (e) => {

    e.preventDefault();

    const id = document.getElementById("receta-id").value;

    const respuesta = await fetch(`http://localhost:3000/recetas/${id}`);

    const data = await respuesta.json();

    mostrarRecetas(data);

});


// ================= BUSCAR POR NOMBRE =================

document.getElementById("form-nombre").addEventListener("submit", async (e) => {

    e.preventDefault();

    const nombre = document.getElementById("receta-nombre").value;

    const respuesta = await fetch(`http://localhost:3000/recetas/nombre/${nombre}`);

    const data = await respuesta.json();

    mostrarRecetas(data);

});


// ================= BUSCAR POR DIFICULTAD =================

document.getElementById("form-dificultad").addEventListener("submit", async (e) => {

    e.preventDefault();

    const dificultad = document.getElementById("receta-dificultad").value;

    const respuesta = await fetch(`http://localhost:3000/recetas`);

    const data = await respuesta.json();

    const filtradas = data.filter(r => r.dificultad === dificultad);

    mostrarRecetas(filtradas);

});


// ================= CREAR RECETA =================
document.getElementById("form-create").addEventListener("submit", async (e) => {

    e.preventDefault();

    const idEditar = document.getElementById("receta-id-editar").value;

    const receta = {

        nombre: document.getElementById("nombre").value,
        categoria: document.getElementById("categoria").value,
        tiempo: document.getElementById("tiempo").value,
        dificultad: document.getElementById("dificultad").value,
        ingredientes: document.getElementById("ingredientes").value,
        preparacion: document.getElementById("preparacion").value

    };

    // ================= EDITAR =================

    if(idEditar){

        await fetch(`http://localhost:3000/recetas/${idEditar}`, {

            method: "PUT",

            headers:{
                "Content-Type":"application/json"
            },

            body: JSON.stringify(receta)

        });

        alert("Receta modificada");

        document.getElementById("btn-guardar").innerText = "Guardar receta";

        document.getElementById("receta-id-editar").value = "";

    }

    // ================= CREAR =================

    else{

        await fetch("http://localhost:3000/recetas", {

            method: "POST",

            headers: {
                "Content-Type": "application/json"
            },

            body: JSON.stringify(receta)

        });

        alert("Receta agregada");

    }

    document.getElementById("form-create").reset();

    cargarRecetas();

});

// ================= CARGA AUTOMATICA =================

cargarRecetas();