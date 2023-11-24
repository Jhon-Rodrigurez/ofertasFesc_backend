import ofertaRepositorio from '../db/repositorios/ofertaRepositorio.js';
import usuarioRepositorio from '../db/repositorios/usuarioRepositorio.js';
import respuestaRepositorio from '../db/repositorios/respuestaRepositorio.js';
import { UsuarioEntity } from '../models/UsuarioModelo.js';
import bcrypt from 'bcrypt';
import crypto from 'crypto';

const crearUsuario = async (usuario)=> {

    try {
        
        if(!usuario.nombre || !usuario.email || !usuario.idArea ||
            !usuario.idRol || !usuario.password ) {
            throw new Error("Datos vacios");
        }

        const email = await usuarioRepositorio.buscarEmail(usuario.email);

        if(email) {
            throw new Error("El correo ya fue registrado.");
        }

        usuario.idUsuario = crypto.randomUUID();
        usuario.passwordEncriptada = bcrypt.hashSync(usuario.password, 10);

        await usuarioRepositorio.crear(new UsuarioEntity(usuario));

        return await usuarioRepositorio.detalle(usuario.idUsuario);

    } catch (error) {
        throw error;
    }
}

const leerUsuario = async (email)=> {

    try {
        const usuario = await usuarioRepositorio.buscarUsuario(email);

        if(!usuario) {
            throw new Error("No se pudo leer el usuario por el correo");
        }
        return usuario;

    } catch (error) {
        throw error;
    }
}

const detalleUsuario = async (idUsuario)=> {
    return await usuarioRepositorio.detalle(idUsuario);
}

const actualizarDescripcion = async(idUsuario, usuario, email)=> {
    
    if(!usuario.celular || !usuario.descripcionExperiencia || !usuario.urlLinkedin ||
        !usuario.urlCv) {
        throw new Error("Datos vacios.")
    }

    const usuarioDescDetalle = await usuarioRepositorio.detalle(idUsuario);
    const usuarioReq = await usuarioRepositorio.buscarIdUsuario(email);

    if(usuarioDescDetalle.idUsuario != usuarioReq.idUsuario) {
        throw new Error("No se puede actualizar la descripcion");
    }

    usuarioDescDetalle.celular = usuario.celular;
    usuarioDescDetalle.descripcionExperiencia = usuario.descripcionExperiencia;
    usuarioDescDetalle.urlLinkedin = usuario.urlLinkedin;
    usuarioDescDetalle.urlCv = usuario.urlCv;

    await usuarioRepositorio.actualizar(usuarioDescDetalle);
    
    return await usuarioRepositorio.detalle(usuarioDescDetalle.idUsuario);
}

const leerMisOfertas = async (idUsuario)=> {

    try {

        const usuario = await usuarioRepositorio.buscarIdUsuario(idUsuario);

        if(usuario == null) {
            throw new Error("No se encuentra el usuario");
        }

        validarRol();

        const array = await ofertaRepositorio.misOfertas(usuario.idUsuario);

        return array;

    } catch (error) {
        throw new Error("No es posible leer mis ofertas");
    }
}

const leerMiDescripcion = async (idUsuario)=> {

    try {

        const usuario = await usuarioRepositorio.buscarIdUsuario(idUsuario);

        if(usuario == null) {
            throw new Error("No se encuentra el usuario");
        }

        const array = await usuarioRepositorio.miDescripcion(usuario.idUsuario);

        return array;

    } catch (error) {
        throw new Error("No es posible leer mi descripcion");
    }
}

const leerMisRespuestas = async (email, idOferta)=> {

    try {

        const usuario = await usuarioRepositorio.buscarIdUsuario(email);
        const oferta = await ofertaRepositorio.detalleOferta(idOferta);

        if(usuario == null) {
            throw new Error("No se encuentra el usuario");
        }

        validarRol();

        const array = await respuestaRepositorio.misRespuestas(usuario.idUsuario, oferta.idOferta);

        return array;

    } catch (error) {
        throw new Error("No es posible leer mis ofertas");
    }
}

const leerUsuarioLogin = async (email)=> {

    try {
        const usuario = await usuarioRepositorio.buscarEmail(email);

        if(!usuario) {
            throw new Error("No se pudo leer el usuario por el correo");
        }
        return usuario;

    } catch (error) {
        throw error;
    }
}

const validarRol = async (idRol)=> {

    const usuarioRol = await usuarioRepositorio.buscarRolAdministrador(idRol);
    
    if(!usuarioRol) {
        throw new Error("Accion denegada. Requiere del rol del administrador");
    }
}

export default {crearUsuario, leerUsuario, leerUsuarioLogin, detalleUsuario, actualizarDescripcion,
     leerMisOfertas, leerMiDescripcion, leerMisRespuestas}