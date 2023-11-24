import {conexion} from '../conexionDB.js';

const crear = async ()=> {
    const connection = await conexion.clienteMySQL();
    try {
        const [rolesExistentes] = await connection.query("SELECT COUNT(*) as count FROM rol");
        const conteo = rolesExistentes[0].count;

        if(conteo > 0) {
            return conteo;
        }

        const tiposRoles = ["Administrador", "Usuario"];

        for(let i = 0; i < tiposRoles.length; i++) {
            const rol = {
                idRol: `${i + 1}`,
                nombre: tiposRoles[i],
            }

            await connection.query("INSERT INTO rol (idRol, nombre) VALUES (?,?)", [rol.idRol, rol.nombre]);
        }

    } catch (error) {
        throw error;

    }
}

const buscarById = async (idRol)=> {
    const connection = await conexion.clienteMySQL();
    try {
        const [rows] = await connection.query("SELECT * FROM rol WHERE idRol = ?", [idRol]);
        return rows.length > 0 ? rows[0] : null;

    } catch (error) {
        throw error;

    }
}

export default {crear, buscarById}