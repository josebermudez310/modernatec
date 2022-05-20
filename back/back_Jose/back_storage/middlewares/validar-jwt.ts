/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import { NextFunction, Request, Response } from "express"
//importación del servicio de autenticación
import { AuthService } from '../services/auth.service';

//middleware que valida si el token enviado es del rol registros
const validarJwt = async (req: Request, res: Response, next: NextFunction) => {
    //traer variables enviadas en la peticion
    const token = req.header('x-token');
    //verificar que se envie el token
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'token no enviado'
        });
    }
    //inicializacion del servicio
    const authService: AuthService = new AuthService();
    //llamamos al servicio que nos trae la información del token
    authService.verificarToken(token).then(
        resp => {
            //validamos que el rol sea registros
            if (resp.data.rol != '1') {
                //si no es registros respondemos error 403
                return res.status(403).json({
                    ok: false,
                    msg: 'No posee los permisos para realizar la accion'
                })
            }
            //dejamos continuar con el siguiente middleware
            next();
        }
    ).catch(
        err => {
            //si ocurre un error respondemos error 401
            return res.status(401).json({
                ok: false,
                msg: 'token invalido'
            });
        }
    )
}
//middleware que valida si el token enviado es del rol registros
const validarJwtBoth = async (req: Request, res: Response, next: NextFunction) => {
    //traer variables enviadas en la peticion
    const token = req.header('x-token');
    //verificar que se envie el token
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'token no enviado'
        });
    }
    //inicializacion del servicio
    const authService: AuthService = new AuthService();
    //llamamos al servicio que nos trae la información del token
    authService.verificarToken(token).then(
        resp => {
            //validamos que el rol sea registros
            if (resp.data.rol == '1' || resp.data.rol == '3') {
                //dejamos continuar con el siguiente middleware
                next();
            } else {
                //si no es registros respondemos error 403
                return res.status(403).json({
                    ok: false,
                    msg: 'No posee los permisos para realizar la accion'
                })
            }

        }
    ).catch(
        err => {
            //si ocurre un error respondemos error 401
            return res.status(401).json({
                ok: false,
                msg: 'token invalido'
            });
        }
    )
}
//validar token
const validarJwtPerfil=(req:Request, res:Response, next: NextFunction)=>{
    //traer variables enviadas en la peticion
    const token = req.header('x-token');
    //verificar que se envie el token
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: 'token no enviado'
        });
    }
    //inicializacion del servicio
    const authService: AuthService = new AuthService();
    authService.verificarToken(token).then(
        resp => {
            //validamos que el token sea valido y sea de la misma persona del id enviado en la petición
            if(resp.data.numero_identificacion == req.params.id){
                //si son iguales dejamos continuar con el siguiente middleware
                next();
            }else{
                //si no son iguales respondemos error 400
                return res.status(400).json({
                    ok:false,
                    msg:'el token no pertenece al id enviado'
                });
            }
        }
    ).catch(
        err => {
            //si ocurre un error respondemos error 401
            return res.status(401).json({
                ok: false,
                msg: 'token invalido'
            });
        }
    )
}
//exportación del middleware
export {
    validarJwt,
    validarJwtBoth,
    validarJwtPerfil
}