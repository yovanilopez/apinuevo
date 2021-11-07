const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//get
router.get('/persona', (req, res) => {
    console.log('Obteniendo Lista de persona')
    mysqlConnection.query('Select * from persona', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Leer por id
router.get('/persona/:id', (req, res) => {
    console.log('Obteniendo persona')
    mysqlConnection.query('Select * from persona where persona.id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

/*Leer por nombre
router.get('/personas/:nombres', (req, res) => {
    console.log('get persona')
    mysqlConnection.query('Select * from persona where persona.nombres = ?', [req.params.nombres], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});*/

//Crear
router.post('/persona', (req, res) => {
    let per = req.body;
    console.log('Creando persona')
    mysqlConnection.query('insert into persona (nombre, apellido,fecha_nacimiento, Direccion ) values (?,?,?,?)',
        [per.nombre, per.apellido, per.fecha_nacimiento, per.Direccion], (err, result) => {
            if (!err) {
                console.log(result);
                res.status(201).send("Creado Correctamente");
            } else {
                console.log(err);
                res.send('Error' + err);
            }
        })
});

//Actualizar
router.put("/persona/:id", (req, res) => {
    console.log("Atualizando persona");
    let per = req.body;
    console.log(per);
    mysqlConnection.query('update persona set nombre = ?, apellido = ?, fecha_nacimiento = ?, Direccion = ? where id = ?',
        [per.nombre, per.apellido, per.fecha_nacimiento, per.Direccion, req.params.id], (err, result) => {
            if (!err) {
                console.log(result);
                
                res.status(202).send("Actualizado");
            } else {
                console.log(err);
                res.send('error' + err);
            }
        });
});

//Eliminar
router.delete("/persona/:id", (req, res) => {
    console.log("Eliminando persona ");
    mysqlConnection.query('delete from persona where persona. id = ?',
        [req.params.id], (err, result) => {
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