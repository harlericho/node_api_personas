const express= require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
// configuracion
app.set('port', process.env.PORT || 2000)
//middleware
app.use(express.json())
app.use(cors())
app.use(morgan('dev'))
//rutas
app.use(require('./router/router'))

//inicio del servidor
app.listen(app.get('port'), ()=>{
    console.log('Servidor iniciado en el puerto: ', app.get('port'))
})
