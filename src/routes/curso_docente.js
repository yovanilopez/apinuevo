const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');

//get
router.get('/curso_docente', (req, res) => {
    console.log('Obteniendo Lista de cursodocente')
    mysqlConnection.query('Select * from curso_docente', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Leer por id
router.get('/curso_docente/:id', (req, res) => {
    console.log('Obteniendo curso_docente')
    mysqlConnection.query('Select * from curso_docente where curso_docente.id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Crear
router.post('/curso_docente', (req, res) => {
    let per = req.body;
    console.log('Creando cursodocente')
    mysqlConnection.query('insert into curso_docente (id_docente, id_curso,stauts, fecha_inicio, fecha_fin ) values (?,?,?,?,?)',
        [per.id_docente, per.id_curso, per.stauts, per.fecha_inicio,per.fecha_fin], (err, result) => {
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
router.put("/curso_docente/:id", (req, res) => {
    console.log("Atualizando persona");
    let per = req.body;
    console.log(per);
    mysqlConnection.query('update curso_docente set id_docente = ?, id_curso = ?, stauts = ?, fecha_inicio = ?,fecha_fin=? where id = ?',
        [per.id_docente, per.id_curso, per.stauts, per.fecha_inicio,per.fecha_fin, req.params.id], (err, result) => {
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
router.delete("/curso_docente/:id", (req, res) => {
    console.log("Eliminando curso ");
    mysqlConnection.query('delete from curso_docente where curso_docente.id = ?',
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


