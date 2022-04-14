/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias 
import { NextFunction, Request, Response } from "express";
import { AuthService } from '../services/auth.service';
//middleware que valida si el id envida existe en la base de datos
const validarId=async(req:Request,res:Response,next:NextFunction)=>{
    //traer variables de la peticion
    const token = req.header('x-token');
    const numero_identificacion: string = req.params.id;
    //validar que venga un id en la peticion
    if(!numero_identificacion){
        return res.status(400).json({
            ok:false,
            msg:'el numero_identificacion es necesario'
        })
    }
    //inicialización del servicio authService
    const authService:AuthService= new AuthService();
    //inicializar la variable que tendra los ids
    let idsVal:any = [];
    //traer todos los ids
    await authService.getAllId(token).then(
        res=>{
            //damos el valor de la respuesta a la variable idsVal
            idsVal=res;    
        }
    ).catch(
        err=>{
            //si ocurre un erro se envia un error 500
            return res.status(500).json({
                ok:false,
                msg:'error al traer los ids'
            })
        }
    )  
    
    
    //validar que el id enviado exista
    if (!idsVal.includes(numero_identificacion)) {
        //si el id no existe retornamos un error 400
        return res.status(400).json({
            ok: false,
            msg: 'Usuario no existente'
        });
    }
    //dejamos continuar con el siguiente middleware
    next();   
}
//exportamos el middleware
export {
    validarId
}