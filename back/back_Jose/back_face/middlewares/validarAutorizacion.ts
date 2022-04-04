//importaciones necesarias 

import { NextFunction, Request, Response } from "express";

const validarRegis=(req:Request,res:Response,next:NextFunction)=>{
    
    const rol = req.params.rol;

    if(rol != '1'){
        return res.status(403).json({
            ok:false,
            msg:'No posee los permisos para realizar la accion'
        })
    }

   
    next();
}

const validarSeg=(req:Request,res:Response,next:NextFunction)=>{
    const rol = req.params.rol;

    if(rol != '3'){
        return res.status(403).json({
            ok:false,
            msg:'No posee los permisos para realizar la accion'
        })
    }

   
    next();
}

export {
    validarRegis,
    validarSeg
}