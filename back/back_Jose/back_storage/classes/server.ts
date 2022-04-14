/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import express from 'express';
//importación de variables de entorno
import { SERVER_PORT } from '../global/environment';
//creación de la clase que contendrá el servidor express
export default class Server{
    //atributo que contendrá la aplicación express
    public app:express.Application;
    //atributo que contendrá el puerto en el que se ejecuta el servidor
    public port:number;

    constructor(){
        //iniciamos el servidor
        this.app=express();
        //establecemos el puerto en el que se ejecutará la aplicación
        this.port=SERVER_PORT;        
    }
    //método para iniciar el servidor
    start(callback:any){
        //iniciar servidor
        this.app.listen(this.port,callback);
    }

}