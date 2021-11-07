const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

router.get('/login', (req, res) => {
    console.log('Obteniendo Lista de login')
    mysqlConnection.query('Select * from login', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Leer por id
router.get('/login/:id', (req, res) => {
    console.log('Obteniendo login')
    mysqlConnection.query('Select * from login where login.id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Crear
router.post('/login', (req, res) => {
    let per = req.body;
    console.log('Creando login')
    mysqlConnection.query('insert into login (nombre, password ) values (?,?)',
        [per.nombre, per.password], (err, result) => {
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
router.put("/login/:id", (req, res) => {
    console.log("Atualizando persona");
    let per = req.body;
    console.log(per);
    mysqlConnection.query('update login set nombre = ?, password = ? where id = ?',
        [per.nombre, per.password,  req.params.id], (err, result) => {
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
router.delete("/login/:id", (req, res) => {
    console.log("Eliminando login ");
    mysqlConnection.query('delete from login where login. id = ?',
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