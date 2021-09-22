const express = require('express')
const router = express.Router()
const mysqlConexion = require('../database')
const { check, validationResult } = require('express-validator')
router.get('/', (req, res) => {
    let sql = 'SELECT * FROM personas'
    mysqlConexion.query(sql, (err, result) => {
        if (err) throw err
        res.status(200).json({
            'respuesta': true,
            'personas': result
        })
    })
})

router.get('/:id', (req, res) => {
    let sql = 'SELECT * FROM personas WHERE id=?'
    mysqlConexion.query(sql, [req.params.id], (error, result) => {
        if (error) throw error
        if (Object.keys(result).length > 0) {
            res.status(200).json({
                'respuesta': true,
                'personas': result
            })
        } else {
            res.status(400).json({
                'respuesta': true,
                'mensaje': 'No existe el dato con ese ID'
            })
        }
    })
})

router.post('/', [
    check('dni', 'Dni es requerido').not().isEmpty(),
    check('dni', 'Dni solo debe tener 10 digitos').isLength({ min: 10, max: 10 }),
    check('dni')
        .custom((value, { req }) => {
            return new Promise((resolve, reject) => {
                mysqlConexion.query('SELECT * FROM personas WHERE dni=?', req.body.dni, (err, res) => {
                    if (err) {
                        reject(new Error('Server Error'))
                    }
                    if (res.length > 0) {
                        reject(new Error('Dni ya esta tomado'))
                    }
                    resolve(true)
                });

            });

        }),
    check('nombres', 'Nombres es requerido').not().isEmpty(),
    check('correo', 'Correo es requerido').not().isEmpty(),
    check('correo', 'Correo es debe ser valido').isEmail(),
    check('correo')
        .custom((value, { req }) => {
            return new Promise((resolve, reject) => {
                mysqlConexion.query('SELECT * FROM personas WHERE correo=?', req.body.correo, (err, res) => {
                    if (err) {
                        reject(new Error('Server Error'))
                    }
                    if (res.length > 0) {
                        reject(new Error('Correo ya esta tomado'))
                    }
                    resolve(true)
                });

            });

        }),
    check('edad', 'Edad debe ser numerico').isNumeric(),
], (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            'respuesta': false,
            'mensaje': errors.array()
        })
    }
    let sql = 'INSERT INTO personas SET ?'
    mysqlConexion.query(sql, [req.body], (error, result) => {
        if (error) throw error
        res.status(200).json({
            'respuesta': true,
            'mensaje': 'Dato guardado correctamente'
        })
    })

})

router.put('/:id', [
    check('dni', 'Dni es requerido').not().isEmpty(),
    check('dni', 'Dni solo debe tener 10 digitos').isLength({ min: 10, max: 10 }),
    check('dni')
        .custom((value, { req }) => {
            return new Promise((resolve, reject) => {
                mysqlConexion.query('SELECT * FROM personas WHERE dni=? OR id=?', [req.body.dni, req.params.id], (err, res) => {
                    if (err) {
                        reject(new Error('Server Error'))
                    }
                    if (res.length >= 2) {
                        reject(new Error('Dni ya esta tomado'))
                    }
                    resolve(true)
                });

            });

        }),
    check('nombres', 'Nombres es requerido').not().isEmpty(),
    check('correo', 'Correo es requerido').not().isEmpty(),
    check('correo', 'Correo es debe ser valido').isEmail(),
    check('correo')
        .custom((value, { req }) => {
            return new Promise((resolve, reject) => {
                mysqlConexion.query('SELECT * FROM personas WHERE correo=? OR id=?', [req.body.correo, req.params.id], (err, res) => {
                    if (err) {
                        reject(new Error('Server Error'))
                    }
                    if (res.length >=2) {
                        reject(new Error('Correo ya esta tomado'))
                    }
                    resolve(true)
                });

            });

        }),
    check('edad', 'Edad debe ser numerico').isNumeric(),
], (req, res) => {
    let errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({
            'respuesta': false,
            'mensaje': errors.array()
        })
    }
    let sql = 'UPDATE personas SET ? WHERE id=?'
    mysqlConexion.query(sql, [req.body, req.params.id], (error, result) => {
        if (error) throw error
        res.status(200).json({
            'respuesta': true,
            'mensaje': 'Dato actualizado correctamente'
        })
    })
})

router.delete('/:id', (req, res) => {
    let sql = 'SELECT * FROM personas WHERE id=?'
    mysqlConexion.query(sql, [req.params.id], (error, result) => {
        if (error) throw error
        let sql = 'DELETE FROM personas WHERE id=?'
        if (Object.keys(result).length > 0) {
            mysqlConexion.query(sql, [req.params.id], (error, result) => {
                if (error) throw error
                if (Object.keys(result).length > 0) {
                    res.status(200).json({
                        'respuesta': true,
                        'mensaje': 'Dato eliminado correctamente'
                    })
                }
            })
        } else {
            res.status(400).json({
                'respuesta': true,
                'mensaje': 'No existe el dato con ese ID'
            })
        }
    })
})

module.exports = router