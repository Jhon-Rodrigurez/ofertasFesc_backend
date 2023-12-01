import {conexion} from '../conexionDB.js';

const crear = async (usuario)=> {
    const connection = await conexion.clienteMySQL();
    const query = "INSERT INTO usuario SET ?";
    await connection.query(query, usuario);
    connection.release();
}

const leer = async ()=> {
    const connection = await conexion.clienteMySQL();
    const [rows] = await connection.query("SELECT * FROM usuario");
    connection.release();
    return rows;
}

const detalle = async (idUsuario)=> {
    const connection = await conexion.clienteMySQL();
    const query = "SELECT * FROM usuario WHERE idUsuario = ?";
    const [rows] = await connection.query(query, [idUsuario]);
    connection.release();
    return rows[0] || {};
}

const actualizar = async (usuarioDescDetalle)=> {
    const connection = await conexion.clienteMySQL();
    const query = "UPDATE usuario SET ? WHERE idUsuario = ?";
    await connection.query(query, [usuarioDescDetalle, usuarioDescDetalle.idUsuario]);
    connection.release();
}

const miDescripcion = async (idUsuario)=> {
    const connection = await conexion.clienteMySQL();
    const query = "SELECT * FROM usuario WHERE idUsuario = ?";
    const [rows] = await connection.query(query, [idUsuario]);
    connection.release();
    return rows || [];
}

const buscarIdUsuario = async (idUsuario) => {
    const connection = await conexion.clienteMySQL();
    const query = "SELECT idUsuario FROM usuario WHERE idUsuario = ?";
    const [rows] = await connection.query(query, [idUsuario]);
    connection.release();
    return rows.length > 0 ? rows[0] : null;
}

const buscarUsuario = async (idUsuario) => {
    const connection = await conexion.clienteMySQL();
    const query = "SELECT * FROM usuario WHERE idUsuario = ?";
    const [rows] = await connection.query(query, [idUsuario]);
    connection.release();
    return rows[0] || null;
}

const buscarEmail = async (email)=> {
    const connection = await conexion.clienteMySQL();
    const query = "SELECT * FROM usuario WHERE email = ?";
    const [rows] = await connection.query(query, [email]);
    connection.release();
    return rows[0] || null;
}

const buscarRolAdministrador = async (idRol)=> {
    const connection = await conexion.clienteMySQL();
    const query = "SELECT idRol FROM usuario WHERE idRol = '1'";
    const [rows] = await connection.query(query, [idRol]);
    connection.release();
    return rows[0] || null;
}

const buscarRolUser = async (idRol)=> {
    const connection = await conexion.clienteMySQL();
    const query = "SELECT idRol FROM usuario WHERE idRol = '2'";
    const [rows] = await connection.query(query, [idRol]);
    connection.release();
    return rows[0] || null;
}

export default {crear, leer, detalle, actualizar, miDescripcion,
     buscarEmail, buscarIdUsuario, buscarRolAdministrador,
      buscarRolUser, buscarUsuario}