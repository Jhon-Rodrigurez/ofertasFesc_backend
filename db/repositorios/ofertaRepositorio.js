import {conexion} from '../conexionDB.js';

const crear = async (oferta)=> {
    const connection = await conexion.clienteMySQL();
    const query = "INSERT INTO oferta SET ?";
    await connection.query(query, oferta);
    connection.release();
}

const leer = async ()=> {
    const connection = await conexion.clienteMySQL();
    const [rows] = await connection.query("SELECT usuario.idUsuario, usuario.nombre, usuario.email, usuario.idRol, oferta.* FROM usuario INNER JOIN oferta ON usuario.idUsuario = oferta.idUsuario ORDER BY creado DESC LIMIT 50");
    connection.release();
    return rows;
}

const detalle = async (idOferta)=> {
    const connection = await conexion.clienteMySQL();
    const query = "SELECT usuario.idUsuario, usuario.nombre, usuario.email, usuario.idRol, oferta.* FROM usuario INNER JOIN oferta ON usuario.idUsuario = oferta.idUsuario WHERE idOferta = ?";
    const [rows] = await connection.query(query, [idOferta]);
    connection.release();
    return rows[0] || {};
}

const detalleOferta = async (idOferta)=> {
    const connection = await conexion.clienteMySQL();
    const query = "SELECT * FROM oferta WHERE idOferta = ?";
    const [rows] = await connection.query(query, [idOferta]);
    connection.release();
    return rows[0] || {};
}

const actualizar = async (ofertaDetalle)=> {
    const connection = await conexion.clienteMySQL();
    const query = "UPDATE oferta SET ? WHERE idOferta = ?";
    await connection.query(query, [ofertaDetalle, ofertaDetalle.idOferta]);
    connection.release();
}

const eliminar = async (idOferta)=> {
    const connection = await conexion.clienteMySQL();
    const query = "DELETE FROM oferta WHERE idOferta = ?";
    await connection.query(query, [idOferta]);
    connection.release();
}

const misOfertas = async (idUsuario)=> {
    const connection = await conexion.clienteMySQL();
    const query = "SELECT usuario.idUsuario, usuario.nombre, usuario.email, usuario.idRol, oferta.* FROM usuario INNER JOIN oferta ON usuario.idUsuario = oferta.idUsuario WHERE usuario.idUsuario = ? ORDER BY creado DESC LIMIT 15";
    const [rows] = await connection.query(query, [idUsuario]);
    connection.release();
    return rows || [];
}

export default {crear, leer, detalle, detalleOferta, actualizar, eliminar, misOfertas}