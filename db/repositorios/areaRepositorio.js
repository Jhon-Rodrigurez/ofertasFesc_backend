import {conexion} from '../conexionDB.js';

const crear = async ()=> {
    const connection = await conexion.clienteMySQL();
    try {
        const [areasExistentes] = await connection.query("SELECT COUNT(*) as count FROM area");
        const conteo = areasExistentes[0].count;

        if(conteo > 0) {
            return conteo;
        }

        const areas = ["Salud", "Tecnología", "Atención al cliente", "Financiero", "Diseño gráfico", "Administrativo", "Otro"];

        for(let i = 0; i < areas.length; i++) {
            const area = {
                idArea: `${i + 1}`,
                nombre: areas[i],
            }

            await connection.query("INSERT INTO area (idArea, nombre) VALUES (?,?)", [area.idArea, area.nombre]);
        }

    } catch (error) {
        throw error;

    }
}

const buscarById = async (idArea) => {
    const connection = await conexion.clienteMySQL();
    try {
      const [rows] = await connection.query("SELECT idArea FROM area WHERE idArea = ?", [idArea]);
      return rows.length > 0 ? rows[0] : null;
    } catch (error) {
      throw error;
    }
};
  

export default {crear, buscarById}