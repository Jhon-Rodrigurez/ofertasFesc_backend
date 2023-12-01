import express from 'express';
import { conexion } from './db/conexionDB.js';
import { variables } from './utils/variables.js';
import { configuracionSeguridad } from './security/configuracionSeguridad.js';
import rolRepositorio from './db/repositorios/rolRepositorio.js';
import areaRepositorio from './db/repositorios/areaRepositorio.js';

var app = express();

const PORT = variables.EXPRESS_PORT;
const HOST = variables.EXPRESS_HOST;

app.use(express.json());
app.use(express.urlencoded({extended: true}));

conexion
    .clienteMySQL()
    .then((connection)=> {
        app.listen(PORT, HOST, ()=> {
            console.log(`Escuchando por el servidor http://${HOST}:${PORT}`);

            rolRepositorio.crear().then(()=> {
            // console.log("roles creados.");
            })

            areaRepositorio.crear().then(()=> {
            // console.log("Areas creadas.");
            })
        });
    })
    .catch((err)=> {
        console.error("Error al conectar a la base de datos: ", err);
        process.exit();
    });

configuracionSeguridad(app);