import ofertaRepositorio from '../db/repositorios/ofertaRepositorio.js';
import usuarioRepositorio from '../db/repositorios/usuarioRepositorio.js';
import { OfertaEntity } from '../models/OfertaModelo.js';
import crypto from 'crypto';

const crearOferta = async (oferta, idUsuario)=> {

    if(!oferta.titulo || !oferta.descripcion || !oferta.idArea || !oferta.fechaExpiracion ||
        !oferta.descripcionExperiencia || !oferta.tiempoExperiencia) {
        throw new Error("Datos vacios");
    }
    
    validarRol();

    oferta.idOferta = crypto.randomUUID();
    oferta.idUsuario = idUsuario;
    oferta.ciudad = "Cúcuta";
    oferta.pais = "Colombia";
    oferta.creado = new Date();

    await ofertaRepositorio.crear(new OfertaEntity(oferta));

    return await ofertaRepositorio.detalle(oferta.idOferta);
}

const leerOferta = async ()=> {
    return await ofertaRepositorio.leer();
}

const detalleOferta = async (idOferta)=> {
    return await ofertaRepositorio.detalle(idOferta);
}

const actualizarOferta = async (idOferta, oferta, idUsuario)=> {

    if(!oferta.ciudad || !oferta.pais) {
        throw new Error("Datos vacios");
    }

    validarRol();

    const ofertaDetalle = await ofertaRepositorio.detalleOferta(idOferta);
    const usuario = await usuarioRepositorio.buscarIdUsuario(idUsuario);

    if(ofertaDetalle.idUsuario != usuario.idUsuario) {
        throw new Error("No se puede actualizar la oferta.");
    }

    ofertaDetalle.ciudad = oferta.ciudad;
    ofertaDetalle.pais = oferta.pais;

    await ofertaRepositorio.actualizar(ofertaDetalle);

    return await ofertaRepositorio.detalle(ofertaDetalle.idOferta);
}

const eliminarOferta = async (idOferta, idUsuario)=> {

    const ofertaDetalle = await ofertaRepositorio.detalleOferta(idOferta);
    const usuario = await usuarioRepositorio.buscarIdUsuario(idUsuario);

    if(ofertaDetalle.idUsuario != usuario.idUsuario) {
        throw new Error("No se puede eliminar la oferta.");
    }

    validarRol();

    return await ofertaRepositorio.eliminar(ofertaDetalle.idOferta);
}

const validarRol = async (idRol)=> {

    const usuarioRol = await usuarioRepositorio.buscarRolAdministrador(idRol);
    
    if(!usuarioRol) {
        throw new Error("Accion denegada. Requiere del rol del administrador");
    }
}

export default {crearOferta, leerOferta, detalleOferta, actualizarOferta, eliminarOferta}