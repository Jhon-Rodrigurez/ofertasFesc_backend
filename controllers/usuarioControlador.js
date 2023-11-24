import respuestasHttp from '../utils/respuestasHttp.js';
import usuarioServicio from '../services/usuarioServicio.js';
import { UsuarioCrearReqModel, UsuarioDatosResModel, UsuarioActualizarReqModel } from '../models/UsuarioModelo.js';
import { OfertaDatosResModel } from '../models/OfertaModelo.js';
import { RespuestaDatosResModel } from '../models/RespuestaModelo.js';

const postUsuario = async (req, res) => {
    try {
        const usuarioReq = new UsuarioCrearReqModel(req.body);
        const usuario = await usuarioServicio.crearUsuario(usuarioReq);
        const usuarioRes = new UsuarioDatosResModel(usuario);
        respuestasHttp.exito(req, res, usuarioRes, 201);

    } catch (err) {
        respuestasHttp.error(req, res, "Error al crear el usuario", err, 400);
    }
}

const getUsuario = async (req, res) => {
    try {

        if (!req.user.error) {
            const usuario = await usuarioServicio.leerUsuario(req.user.sub);
            const usuarioRes = new UsuarioDatosResModel(usuario);
            respuestasHttp.exito(req, res, usuarioRes, 200);

        } else {
            respuestasHttp.error(req, res, "", req.user.error, 403);
        }
        
    } catch (err) {
        respuestasHttp.error(req, res, "Error al leer el usuario", err, 400);
    }
}

const getDetalleUsuario = async (req, res) => {

    try {

        const usuario = await usuarioServicio.detalleUsuario(req.params.id);
        respuestasHttp.exito(req, res, new UsuarioDatosResModel(usuario), 200);

    } catch (err) {
        respuestasHttp.error(req, res, "Error al obtener el detalle del usuario", err, 400);
    }
}

const putDescripcion = async(req, res)=> {

    try {

        if(!req.user.error) {

            const usuario = await usuarioServicio.actualizarDescripcion(req.params.id, new UsuarioActualizarReqModel(req.body), req.user.sub);
            respuestasHttp.exito(req, res, new UsuarioDatosResModel(usuario), 200);

        } else {
            respuestasHttp.error(req, res, "", req.user.error, 403);
        }
    } catch(err) {
        respuestasHttp.error(req, res, "Error al actualizar la descripcion de usuario", err, 400);
    }
}

const getMisOfertas = async (req, res) => {
    
    try {

        if (!req.user.error) {
            const array = await usuarioServicio.leerMisOfertas(req.user.sub);
            const lasOfertas = array.map(oferta => new OfertaDatosResModel(oferta));

            respuestasHttp.exito(req, res, lasOfertas, 200);
            
        } else {
            respuestasHttp.error(req, res, "", req.user.error, 403);
        }
    } catch (err) {
        respuestasHttp.error(req, res, "Error al leer mis ofertas", err, 400);
    }
}

const getMiDescripcion = async (req, res) => {
    try {

        if (!req.user.error) {
            const array = await usuarioServicio.leerMiDescripcion(req.user.sub);
            const laDescripcion = array.map(usuario => new UsuarioDatosResModel(usuario));

            respuestasHttp.exito(req, res, laDescripcion, 200);
            
        } else {
            respuestasHttp.error(req, res, "", req.user.error, 403);
        }
    } catch (err) {
        respuestasHttp.error(req, res, "Error al leer mi descripcion", err, 400);
    }
}

const getMisRespuestas = async (req, res) => {
    try {

        if (!req.user.error) {
            const respuestas = await usuarioServicio.leerMisRespuestas(req.user.sub, req.params.id);
            const lasRespuestas = respuestas.map(respuesta => new RespuestaDatosResModel(respuesta));

            respuestasHttp.exito(req, res, lasRespuestas, 200);
            
        } else {
            respuestasHttp.error(req, res, "", req.user.error, 403);
        }
    } catch (err) {
        respuestasHttp.error(req, res, "Error al leer mis respuestas", err, 400);
    }
}

const postSignin= (req, res)=> {
    
    if(!req.user.error) {
        respuestasHttp.signin(req, res, "", 200);
    } else {
        respuestasHttp.error(req, res, "", req.user.error, 403);
    }
}

export default { postUsuario, getUsuario, getDetalleUsuario, putDescripcion,
     getMisOfertas, getMiDescripcion, getMisRespuestas, postSignin }