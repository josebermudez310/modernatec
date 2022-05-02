/**
 * @author Jose Daniel Bermudez Salamanca
 */

//importaciones necesarias
//importaciones necesarias
import { NextFunction, Request, Response } from "express";

//importacion de la conexion con la base de datos
import { Conection } from '../db/config';

//middleware valida si existe el código de la cita
const validarCodigo=async(req:Request,res:Response,next:NextFunction)=>{
    //constante con el codigo de la cita
    const codigo = req.params.codigo;
    //validamos que se haya enviado el codigo 
    if(!codigo){
        //si no se ha enviado el codigo respondemos error 400
        return res.status(400).json({
            ok:false,
            msg:'codigo de la cita no enviado'
        });
    }
    //Creamos la conexion con la base de datos
    const conection = new Conection();
    //realizamos la sentencia sql para obtener la cita con el codigo proporcionado
    conection.conection.query(`select * from citas where codigo_cita=${codigo}`,(error, results)=>{
        //validamos si ocurre un error al traer la cita        
        if(error){
            //si existe el error respondemos error 500
            return res.status(500).json({
                ok:false,
                msg:'error al buscar la cita'
            });
        }       
        //validamos que exista la cita
        if(!results[0]){
            //si no existte la cita respondemos error 400
            return res.status(400).json({
                ok:false,
                msg:'No existe una cita con ese código'
            });
        }
        //si existe la cita destruimos la conexion con la base de datos dejamos continuar con el siguiente middleware
        conection.destroy();
        next();
    })

}
//exportación del middleware
export {
    validarCodigo
}