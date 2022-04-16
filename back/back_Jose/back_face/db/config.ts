/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import mysql from 'mysql';
import fs from 'fs';
import path from 'path'
//importaciones de variables de entorno
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } from '../global/environment';
//creación y exportación de la clase para conectarse a la base de datos
export class Conection {
    //propiedad que contendrá la conexión a la base de datos
    public conection:mysql.Connection;
    
    constructor(){
        //crear la conexión con la base de datos
        this.conection = mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_DATABASE,
            port:3306,
            ssl: {ca: fs.readFileSync(path.join(__dirname,'DigiCertGlobalRootCA.crt.pem'))}
        })
    }
    //función para destruir la conexión con la base de datos
    destroy(){
        this.conection.end();
    }
    
}