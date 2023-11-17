import mysql from 'mysql2/promise';
import { variables } from '../utils/variables.js';

const pool = mysql.createPool({
    host: variables.MYSQL_HOST,
    user: variables.MYSQL_USER,
    password: variables.MYSQL_PASSWORD,
    database: variables.MYSQL_DB
});

const conexion = {
    clienteMySQL: async ()=> {
        try {
            const connection = await pool.getConnection();

            console.log("Conexion a la base de datos exitosa.");
            connection.release();

            return connection;

        } catch (error) {
            console.error("Error al conectar a la base de datos: ", error);
            throw error;
        }
    },
};

export {conexion}