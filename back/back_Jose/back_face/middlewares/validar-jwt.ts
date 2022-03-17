//importaciones necesarias

import { NextFunction, Request, Response } from "express"
import jwt  from  "jsonwebtoken";
import { JWT_SECRET } from "../global/environment";

const validarJwt=(req:Request,res:Response,next:NextFunction)=>{

    const token = req.header('x-token');

    if( !token ) {
        return res.status(401).json({
            ok:false,
            msg: 'token no enviado'
        });
    }

    try {
        
        const validado = jwt.verify(token,JWT_SECRET);
        next();

    } catch (error) {
        return res.status(401).json({
            ok:false,
            msg:'token invalido'
        });
    }

    
}

export {
    validarJwt
}