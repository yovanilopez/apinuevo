const express = require('express');
const router = express.Router();

const mysqlConnection = require('../configurations/db-conf');



//get
router.get('/estudiante_curso', (req, res) => {
    console.log('Obteniendo Lista de curso estudiante')
    mysqlConnection.query('Select * from estudiante_curso', (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Leer por id
router.get('/estudiante_curso/:id', (req, res) => {
    console.log('Obteniendo estudiante_curso')
    mysqlConnection.query('Select * from estudiante_curso where estudiante_curso.id = ?', [req.params.id], (err, rows, fields) => {
        if (!err) {
            res.send(rows);
        } else {
            console.log(err);
        }
    })
});

//Crear
router.post('/estudiante_curso', (req, res) => {
    let per = req.body;
    console.log('Creando curso estudiante')
    mysqlConnection.query('insert into estudiante_curso (id_estudiante, id_curso,status,fecha_inicio, fecha_fin ) values (?,?,?,?,?)',
        [per.id_estudiante, per.id_curso, per.status, per.fecha_inicio,per.fecha_fin], (err, result) => {
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
router.put("/estudiante_curso/:id", (req, res) => {
    console.log("Atualizando estudiante_curso");
    let per = req.body;
    console.log(per);
    mysqlConnection.query('update estudiante_curso set id_estudiante = ?, id_curso = ?, status= ?, fecha_inicio = ?,fecha_fin=?  where id = ?',
        [per.id_estudiante, per.id_curso, per.status, per.fecha_inicio,per.fecha_fin, req.params.id], (err, result) => {
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
router.delete("/estudiante_curso/:id", (req, res) => {
    console.log("Eliminando estudiante_curso ");
    mysqlConnection.query('delete from estudiante_curso where estudiante_curso.id = ?',
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