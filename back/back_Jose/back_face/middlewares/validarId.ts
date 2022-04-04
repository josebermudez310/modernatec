//importaciones necesarias 

import { NextFunction, Request, Response } from "express";
import { AuthService } from '../services/auth.service';

const validarId=async(req:Request,res:Response,next:NextFunction)=>{
    //traer variables de la peticion
    const token = req.header('x-token');
    const numero_identificacion: string = req.params.id || req.body.numero_identificacion;
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
            idsVal=res;    
        }
    )    
    
    
    //validar que el id enviado exista
    if (!idsVal.includes(parseInt(numero_identificacion))) {
        return res.status(400).json({
            ok: false,
            msg: 'Usuario no existente'
        });
    }
    
    next();
   
}

export {
    validarId
}