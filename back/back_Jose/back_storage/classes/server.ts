/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import express from 'express';
import socketIO from 'socket.io';
import http from 'http';
//importación de variables de entorno
import { SERVER_PORT } from '../global/environment';
//importacion de la logica de los sockets
import * as socket from '../sockets/sockets';
//creación de la clase que contendrá el servidor express
export default class Server {
    //atributo con la instance del servidor
    private static _instance: Server;
    //atributo que contendrá la aplicación express
    public app: express.Application;
    //atributo que contendrá el puerto en el que se ejecuta el servidor
    public port: number;
    //atributo que contendrá el servidor de sockets
    public io: socketIO.Server;
    //atributo con el servidor http
    private httpServer: http.Server;
    //constructor
    private constructor() {
        //iniciamos el servidor
        this.app = express();
        //establecemos el puerto en el que se ejecutará la aplicación
        this.port = SERVER_PORT;
        //iniciamos el servidor http
        this.httpServer = new http.Server(this.app);
        //inicamos los sockets
        this.io = new socketIO.Server(this.httpServer, {
            cors: {
                origin: true,
                credentials: true
            }
        });
        //llamamos  la  fucion que inia los sockets
        this.startSockets();
    }
    //getter para obtener el instance
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    //metodo para escuchar los sockets
    private startSockets() {
        //escuchar la conexion al servidor de sockets
        this.io.on('connection', cliente => {
            console.log('cliente conectado');
            //escuchar la desconexion del cliente
            socket.desconectar(cliente);
            //emitir evento actualmente
            socket.actualmente(cliente,this.io);
            //escuchar los nuevos ingresos
            socket.nuevoIngreso(cliente,this.io);
        });
    }

    //método para iniciar el servidor
    start(callback: any) {
        //iniciar servidor
        this.httpServer.listen(this.port, callback);
    }

}