import respuestasHttp from '../utils/respuestasHttp.js';
import respuestaServicio from '../services/respuestaServicio.js';
import { RespuestaCrearReqModel, RespuestaDatosResModel } from '../models/RespuestaModelo.js';

const postRespuesta = async (req, res)=> {

    try {

        if(!req.user.error) {
            const respuesta = await respuestaServicio.crearRespuesta(new RespuestaCrearReqModel(req.body), req.user.sub);
            respuestasHttp.exito(req, res, new RespuestaDatosResModel(respuesta), 201);

        } else {
            respuestasHttp.error(req, res, "No se proporcionó un usuario autenticado", req.user.error, 403)
        }

    } catch (err) {
        respuestasHttp.error(req, res, "Error al crear la respuesta", 400)
        console.error(err);
    }
}

const getRespuesta = async (req, res)=> {

    try {
        const array = await respuestaServicio.leerRespuesta();
        const lasRespuestas = array.map(respuesta=> new RespuestaDatosResModel(respuesta));
        respuestasHttp.exito(req, res, lasRespuestas, 200);

    } catch (err) {
        respuestasHttp.error(req, res, "Error al leer las respuestas", 400);
    }
}

export default {postRespuesta, getRespuesta}