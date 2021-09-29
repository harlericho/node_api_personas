const mysql = require('mysql');
const mysqlConexion = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'laravel_api_personas'
})
mysqlConexion.connect((error) => {
    if (error) throw error
    console.log('Conectado a la base de dato')
})

module.exports = mysqlConexion