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

const buscarIdUsuario = async ()=> {
    const connection = await conexion.clienteMySQL();
    const [rows] = await connection.query("SELECT idUsuario FROM usuario");
    connection.release();
    return rows[0];
}

const buscarEmailUser = async (email)=> {
    const connection = await conexion.clienteMySQL();

    try {
        const [rows, _] = await connection.query(
            "SELECT idUsuario, email FROM usuario WHERE idUsuario = ?",
            [email]
        );
        return rows[0] || null;

    } catch (error) {
        throw error;
    }
}

const buscarEmail = async (email)=> {
    const connection = await conexion.clienteMySQL();

    try {
        const [rows, _] = await connection.query(
            "SELECT * FROM usuario WHERE email = ?",
            [email]
        );
        return rows[0] || null;

    } catch (error) {
        throw error;
    }
}

const buscarRolAdministrador = async (idRol)=> {
    const connection = await conexion.clienteMySQL();

    try {
        const [rows, _] = await connection.query(
            "SELECT idRol FROM usuario WHERE idRol = '1'",
            [idRol]
        );
        return rows[0] || null;

    } catch (error) {
        throw error;
    }
}

const buscarRolUser = async (idRol)=> {
    const connection = await conexion.clienteMySQL();

    try {
        const [rows, _] = await connection.query(
            "SELECT idRol FROM usuario WHERE idRol = '2'",
            [idRol]
        );
        return rows[0] || null;

    } catch (error) {
        throw error;
    }
}

export default {crear, leer, detalle, actualizar, miDescripcion, buscarEmail, buscarIdUsuario, buscarRolAdministrador,
     buscarEmailUser, buscarRolUser}