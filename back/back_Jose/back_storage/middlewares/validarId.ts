//importaciones necesarias 

import { NextFunction, Request, Response } from "express";

const validarId=(req:Request,res:Response,next:NextFunction)=>{
    const id: string = req.params.id;

    const idsVal = ['1000161702', '1016943155', '1234567890']

    if (!idsVal.includes(id)) {
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