import respuestaRepositorio from "../db/repositorios/respuestaRepositorio.js";
import usuarioRepositorio from "../db/repositorios/usuarioRepositorio.js";
import { RespuestaEntity } from "../models/RespuestaModelo.js";
import crypto from "crypto";

const crearRespuesta = async (respuesta, idUsuario)=> {

    if(!respuesta.idOferta || !respuesta.experienciaDescripcion || !respuesta.experienciaTiempo) {
        throw new Error("Datos vacios");
    }
    
    validarRol();

    const usuario = await usuarioRepositorio.buscarIdUsuario(idUsuario);

    respuesta.idRespuesta = crypto.randomUUID();
    respuesta.idUsuario = usuario.idUsuario;
    respuesta.fechaAplicado = new Date();

    await respuestaRepositorio.crear(new RespuestaEntity(respuesta));

    return await respuestaRepositorio.detalle(respuesta.idRespuesta);
}

const leerRespuesta = async ()=> {
    return await respuestaRepositorio.leer();
}

const detalleRespuesta = async (idRespuesta, idUsuario)=> {

    const respuestaDetalle = await respuestaRepositorio.detalle(idRespuesta);
    const usuario = await usuarioRepositorio.buscarEmailUser(idUsuario);

    if(respuestaDetalle.idUsuario != usuario.idUsuario) {
        throw new Error("No se puede obtener el detalle de la respuesta.");
    }
    
    return await respuestaRepositorio.detalle(idRespuesta);
}

const validarRol = async (idRol)=> {

    const usuarioRol = await usuarioRepositorio.buscarRolUser(idRol);
    
    if(!usuarioRol) {
        throw new Error("Accion denegada. Requiere del rol del usuario");
    }
}

export default {crearRespuesta, leerRespuesta, detalleRespuesta}