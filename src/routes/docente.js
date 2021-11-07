const express = require('express');
const router = express.Router();


const mysqlConnection = require('../configurations/db-conf');



//get
router.get('/docente', (req, res) => {
    console.log('Obteniendo Lista de docente')
    mysqlConnection.query('Select * from docente', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Leer por id
router.get('/docente/:id', (req, res) => {
    console.log('Obteniendo docente')
    mysqlConnection.query('Select * from docente where docente.id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});


//Crear
router.post('/docente', (req, res) => {
    let per = req.body;
    console.log('Creando docente')
    mysqlConnection.query('insert into docente (id_persona, fecha_ingreso) values (?,?)',
        [per.id_persona, per.fecha_ingreso], (err, result) => {
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
router.put("/docente/:id", (req, res) => {
    console.log("Atualizando docente");
    let per = req.body;
    console.log(per);
    mysqlConnection.query('update docente set id_persona = ?, fecha_ingreso = ? where id = ?',
        [per.id_persona, per.fecha_ingreso,  req.params.id], (err, result) => {
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
router.delete("/docente/:id", (req, res) => {
    console.log("Eliminando docente ");
    mysqlConnection.query('delete from docente where docente.id = ?',
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
