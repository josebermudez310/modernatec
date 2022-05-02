/**
 * @author Jose Daniel Bermudez Salamanca
 */

import { Socket } from "socket.io";
import socketIO from 'socket.io';
import { Conection } from '../db/config';

const desconectar = (cliente: Socket) => {
    cliente.on('disconnect', () => {
        console.log('cliente desconectado');

    })
}

const nuevoIngreso = (cliente:Socket,io: socketIO.Server)=>{
    cliente.on('nuevo-ingreso',()=>{
        actualmente(cliente, io);
    })
}

const actualmente = (cliente: Socket, io: socketIO.Server) => {
    const db = new Conection;
    db.conection.query('select count(*) as total from registros where hora_salida is null', (err, resp) => {
        if (err) {
            io.emit('actual', 'error al traer la informacion');
        }else{
            io.emit('actual',resp);
        }
    })
}

export {
    desconectar,
    actualmente,
    nuevoIngreso
}