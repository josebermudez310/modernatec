//importaciones necesarias

import { NextFunction, Request, Response } from "express"
import { AuthService } from '../services/auth.service';

const validarJwt=async (req:Request,res:Response,next:NextFunction)=>{
    //traer variables enviadas en la peticion
    const token = req.header('x-token');
    //varificar que se envie el token
    if( !token ) {
        return res.status(401).json({
            ok:false,
            msg: 'token no enviado'
        });
    }
    //inicializacion del servicio
    const authService:AuthService= new AuthService();

    try {
        
        authService.verificarToken(token).then(
            res=>{
                req.params.rol=res.data.rol
                console.log(res.data);   
                next() ;
            }
        ).catch(
            err=>{
                return res.status(401).json({
                    ok:false,
                    msg:'token invalido'
                });
            }
        )

    } catch (error) {
       
    }

    
}

export {
    validarJwt
}