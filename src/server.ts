import express from 'express'
import colors from 'colors'
import cors, { CorsOptions } from 'cors'
import morgan from 'morgan'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec, { swaggerUiOptions } from './config/swagger'
import router from './router'
import db from './config/db'


//Conectar base de datos
export async function conectDB() {
    try {
        await db.authenticate()
        db.sync()
        // console.log(colors.magenta.bold('Conexión correcta a la base de datos'))
    } catch (error) {
        console.log(error)
        console.log( colors.red.bold('Hubo un error al conectar a la base de datos'))
    }
}

conectDB()

//Instancia desde express
const server = express()

//Permitir conexiones CORS
const corsOptions: CorsOptions = {
    origin: function(origin, callback) {
        if(origin === process.env.FRONTED_URL) {
            callback(null, true)
        } else {
            callback(new Error('Error de CORS'))
        }
    }
}

server.use(cors(corsOptions))

//Leer datos de formularios
server.use(express.json())

server.use(morgan('dev'))
server.use('/api/products', router)

//Documentacion
server.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec, swaggerUiOptions))

export default server