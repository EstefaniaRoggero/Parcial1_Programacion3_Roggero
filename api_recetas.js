const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");

const app = express();

// ================= CONFIGURACIONES =================

app.use(cors());
app.use(express.json());
app.use(express.static("frontend"));


// ================= CONEXION MYSQL =================

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "bd_recetas"

});


// ================= GET TODAS LAS RECETAS =================

app.get("/recetas", (req, res) => {
    const sql = "SELECT * FROM recetas";
    db.query(sql, (err, result) => {

        if(err){
            console.log(err);
            res.send("Error en la consulta");
        } else {
        res.send(result);

        }

    });

});


// ================= GET RECETA POR ID =================

app.get("/recetas/:id", (req, res) => {
    const id = req.params.id;
    const sql = "SELECT * FROM recetas WHERE id = ?";
    db.query(sql, [id], (err, result) => {
        if(err){

            console.log(err);
            res.send("Error al buscar receta");
        } else {
            res.send(result);
        }

    });

});


// ================= GET RECETA POR NOMBRE =================

app.get("/recetas/nombre/:nombre", (req, res) => {
    const nombre = req.params.nombre;
    const sql = "SELECT * FROM recetas WHERE nombre LIKE ?";
    db.query(sql, [`%${nombre}%`], (err, result) => {

        if(err){
            console.log(err);
            res.send("Error al buscar receta");
        } else {
          res.send(result);

        }

    });

});


// ================= POST CREAR RECETA =================

app.post("/recetas", (req, res) => {
    const {

        nombre,
        categoria,
        tiempo,
        dificultad,
        ingredientes,
        preparacion

    } = req.body;

    const sql = `
        INSERT INTO recetas
        (nombre, categoria, tiempo, dificultad, ingredientes, preparacion)
        VALUES (?, ?, ?, ?, ?, ?)
    `;

    db.query(

        sql,

        [
            nombre,
            categoria,
            tiempo,
            dificultad,
            ingredientes,
            preparacion
        ],

        (err, result) => {

            if(err){
                console.log(err);
                res.send("Error al crear receta");
            } else {
                res.send("Receta creada correctamente");
            }

        }
    );

});


// ================= PUT MODIFICAR RECETA =================

app.put("/recetas/:id", (req, res) => {
    const id = req.params.id;

    const {
        nombre,
        categoria,
        tiempo,
        dificultad,
        ingredientes,
        preparacion

    } = req.body;

    const sql = `
        UPDATE recetas
        SET
            nombre = ?,
            categoria = ?,
            tiempo = ?,
            dificultad = ?,
            ingredientes = ?,
            preparacion = ?
        WHERE id = ?
    `;

    db.query(

        sql,
        [
            nombre,
            categoria,
            tiempo,
            dificultad,
            ingredientes,
            preparacion,
            id
        ],

        (err, result) => {

            if(err){
                console.log(err);
                res.send("Error al editar receta");
            } else {
                res.send("Receta actualizada correctamente");
            }

        }
    );

});


// ================= DELETE ELIMINAR RECETA =================

app.delete("/recetas/:id", (req, res) => {

    const id = req.params.id;

    const sql = "DELETE FROM recetas WHERE id = ?";

    db.query(sql, [id], (err, result) => {

        if(err){
            console.log(err);
            res.send("Error al eliminar receta");
        } else {
            res.send("Receta eliminada correctamente");
        }

    });

});


// ================= SERVIDOR =================

app.listen(3000, () => {

    console.log("Servidor corriendo en puerto 3000");

});