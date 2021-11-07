const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//Crear vuelo
router.post("/estudiante", (req, res) => {
    console.log("Creando estudiante");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('insert into estudiante (id_persona,fecha_ingreso,carnet,status) values (?,?,?,?)',
        [est.id_persona, est.fecha_ingreso, est.carnet, est.status, est.id_estado], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(201).send("estudiante Creado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Obtener vuelo
router.get("/estudiante", (req, res) => {
    console.log("Obteniendo Lista estudiante");
    mysqlConnection.query('Select * from estudiante', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Obtener vuelo por id
router.get("/estudiante/:id", (req, res) => {
    console.log("Obteniendo Vuelo");
    mysqlConnection.query('Select * from estudiante where id= ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
            res.send('error' + err);
        }
    });
});

//Actualizar vuelo
router.put("/estudiante/:id", (req, res) => {
    console.log("Actualizando estudiante");
    let est = req.body;
    console.log(est);
    mysqlConnection.query('update estudiante set id_persona = ?, fecha_ingreso = ?, carnet = ?, status = ? where id= ?',
        [est.id_persona, est.fecha_ingreso, est.carnet,est.status, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("estudiante Actualizado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar Vuelo
router.delete("/estudiante/:id", (req, res) => {
    console.log("Eliminando estudiante");
    mysqlConnection.query('delete from estudiante where estudiante.id = ?',
        [req.params.id], (err, result) => {
            if (!err) {
                console.log(result);

                res.status(202).send("estudiante Borrado Correctamente");
            } else {
                console.log(err);
                res.send('error' + err);
            }n
        });
});

module.exports = router;