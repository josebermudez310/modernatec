/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import { Request, Response } from "express";
//importación de la clase que permite la conexión a la base de datos
import { Conection } from "../db/config";
//funcion, retorna la sumatoria de los últimos 5 dias de registros en la base de datos
const getUltimosDias = async (req: Request, res: Response) => {
    //creacion de la coneccion
    const db = new Conection();
    //estabalecer coneccion con la base de datos
    db.conection.connect(
        err => {
            //validar si ocurrió algun error
            if (err) {
                //si ocurre un error retornamos error 500
                return res.status(400).json({
                    ok: false,
                    msg: 'error al conectar con la base de datos'
                })
            }
        }
    );
    //realizamos la consulta sql
    db.conection.query(`SELECT count(*) as total,fecha  FROM registros GROUP BY fecha order by fecha desc limit 5;`, (err, resp) => {
        //validamos si ocurrio un error
        if (err) {
            //si ocurre un error respondemos error 500
            return res.status(500).json({
                ok: false,
                msg: 'error al traer los datos'
            })
        } else {
            //destruir la coneccion con la baase de datos
            db.destroy();
            //si no ocurren errores respondemos satisfactoriamente 
            return res.json({
                ok: true,
                msg: 'registros encontrados',
                data: resp
            })
        }
    })
}
//función, retorna la sumatoria de los últimos 5 meses de la base de datos
const getUltimosMeses = (req: Request, res: Response) => {
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
    //realizamos la consulta sql
    db.conection.query(`SELECT count(*) as total,month(fecha) as mes, year(fecha) as año FROM registros  GROUP BY month(fecha),year(fecha) order by mes desc,año desc limit 5;;`, (err, resp) => {
        //validamos si ocurrio un error
        if (err) {
            //si ocurre un error respondemos error 500
            return res.status(500).json({
                ok: false,
                msg: 'error al traer los datos'
            })
        } else {
            //destruir la coneccion con la baase de datos
            db.destroy();
            //si no ocurren errores respondemos satisfactoriamente 
            return res.json({
                ok: true,
                msg: 'registros encontrados',
                data: resp
            })
        }
    })
}
//exportamos las funciones del controlador
export {
    getUltimosDias,
    getUltimosMeses
}