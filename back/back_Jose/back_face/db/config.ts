//importaciones necesarias
import mysql from 'mysql';
import { DB_HOST, DB_USER, DB_PASSWORD, DB_DATABASE } from '../global/environment';
import fs from 'fs';
export class Conection {
    public conection:mysql.Connection;

    constructor(){
        this.conection = mysql.createConnection({
            host: DB_HOST,
            user: DB_USER,
            password: DB_PASSWORD,
            database: DB_DATABASE,
            ssl:{
                ca:fs.readFileSync('DigiCertGlobalRootCA.crt.pem')
            }
        })
    }

    destroy(){
        this.conection.end();
    }
    
}