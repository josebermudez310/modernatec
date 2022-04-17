/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import { Request, Response } from "express";
//importación de la clase que permite la conexión a la base de datos
import { Conection } from "../db/config";

//funcion, permite establecer al usuario las urls de sus imagenes guardadas 
const setUrlImagen = async (req: Request, res: Response) => {
    //traer variables enviadas en la peticion
    const numero_identificacion = req.body.numero_identificacion;
    const urlImgs = JSON.parse(req.body.urlImgs);
    //validar que se reciba las urls y sea un array
    if (!Array.isArray(urlImgs)) {
        return res.status(400).json({
            ok: false,
            msg: 'el urlImgs es requerido y debe ser un array'
        })
    }
    //establecer la constante images como string
    const images = urlImgs.toString();
    //creacion de la coneccion
    const db = new Conection();
    //estabalecer coneccion con la base de datos
    db.conection.connect(
        err => {
            //validar si ocurrió algun error
            if (err) {
                //si ocurre un error retornamos error 500
                return res.status(500).json({
                    ok: false,
                    msg: 'error al conectar con la base de datos'
                })
            }
        }
    );

    //establecer las imagenes al usuario
   db.conection.query(`update users set url_imagen='${images}'where numero_identificacion=${numero_identificacion}`, (err, resp) => {
        //validamos si ocurre un error
        if (err) {
            //retornamos error 500
            return res.status(500).json({
                ok: false,
                msg: 'error no identificado',
                err
            })
        } else {
            //destruir la coneccion con la baase de datos
            db.destroy();
            //responder satisfactoriamente
            res.json({
                ok: true,
                msg: 'imagenes del usuario añadidas'
            });
        }
    })
}
//exportamos funciones
export {
    setUrlImagen
}