import {conexion} from '../conexionDB.js';

const crear = async (respuesta)=> {
    const connection = await conexion.clienteMySQL();
    const query = "INSERT INTO respuesta SET ?";
    await connection.query(query, respuesta);
    connection.release();
}

const leer = async ()=> {
    const connection = await conexion.clienteMySQL();
    const [rows] = await connection.query("SELECT usuario.idUsuario, usuario.nombre, usuario.email, usuario.celular, usuario.descripcionExperiencia, usuario.urlCv, respuesta.* FROM usuario INNER JOIN respuesta ON usuario.idUsuario = respuesta.idUsuario");
    connection.release();
    return rows;
}

const detalle = async (idRespuesta)=> {
    const connection = await conexion.clienteMySQL();
    const query = "SELECT usuario.idUsuario, usuario.nombre, usuario.email, usuario.celular, usuario.descripcionExperiencia, usuario.urlCv, respuesta.* FROM usuario INNER JOIN respuesta ON usuario.idUsuario = respuesta.idUsuario WHERE idRespuesta = ?";
    const [rows] = await connection.query(query, [idRespuesta]);
    connection.release();
    return rows[0] || {};
}

const detalleRespuesta = async (idRespuesta)=> {
    const connection = await conexion.clienteMySQL();
    const query = "SELECT * FROM respuesta WHERE idRespuesta = ?";
    const [rows] = await connection.query(query, [idRespuesta]);
    connection.release();
    return rows[0] || {};
}

const misRespuestas = async (idOferta, idUsuario)=> {
    const connection = await conexion.clienteMySQL();
    const query = "SELECT res.idRespuesta, res.experienciaDescripcion, res.experienciaTiempo, res.fechaAplicado, us.idUsuario, us.nombre, us.email, us.celular, us.descripcionExperiencia, of.idOferta, of.titulo FROM respuesta AS res JOIN usuario AS us ON res.idUsuario = us.idUsuario JOIN oferta AS of ON res.idOferta = of.idOferta WHERE of.idOferta = ?";
    const [rows] = await connection.query(query, [idUsuario, idOferta]);
    connection.release();
    return rows || [];
}

export default {crear, leer, detalle, detalleRespuesta, misRespuestas}