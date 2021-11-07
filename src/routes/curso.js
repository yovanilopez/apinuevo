const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//Ver Rutas
router.get("/curso", (req, res) => {
    console.log("Obteniendo Lista de curso");
    mysqlConnection.query('Select * from curso', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send(err);
        }
    });
});


//Ver Ruta en Especifico
router.get("/curso/:id", (req, res) => {
    console.log("Obteniendo curso");
    mysqlConnection.query('Select * from curso where id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Crear Ruta
router.post("/curso", (req, res) => {
    console.log("Creando curso");
    let route = req.body;

    mysqlConnection.query('insert into curso (nombre,descripcion) values (?,?)',
        [route.nombre, route.descripcion], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Creado Correctamente");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        });
});

//Actualizar Ruta
router.put("/curso/:id", (req, res) => {
    console.log("Actualizando curso");
    let route = req.body;

    mysqlConnection.query('update curso set nombre= ?, descripcion = ?  where id = ?',
        [route.nombre, route.descripcion, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(202).send("Actualizado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar Ruta
router.delete("/curso/:id", (req, res) => {
    console.log("Eliminando curso ");
    mysqlConnection.query('delete from curso where id = ?',
        [ req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("Eliminado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

module.exports = router;