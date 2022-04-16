/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import { NextFunction, Request, Response } from "express"
//importación del servicio de autenticación
import { AuthService } from '../services/auth.service';

//middleware que valida si el token enviado es del rol registros
const validarJwtRegis = async (req: Request, res: Response, next: NextFunction) => {
    //traer variables enviadas en la peticion
    const token = req.header('x-token');
    //varificar que se envie el token
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
                //si es diferente al rol registros se envia una respuesta 403
                return res.status(403).json({
                    ok: false,
                    msg: 'No posee los permisos para realizar la accion'
                })
            }
            //si el rol es registros dejamos continuar con el siguiente middleware   
            next();
        }
    ).catch(
        err => {
            //si ocurre un error retornamos una respuesta 401
            return res.status(401).json({
                ok: false,
                msg: 'token invalido'
            });
        }
    )
}

//middleware que valida si el token enviado es del rol seguridad
const validarJwtSeg = async (req: Request, res: Response, next: NextFunction) => {
    //traer variables enviadas en la peticion
    const token = req.header('x-token');
    //varificar que se envie el token
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
            //validamos que el rol sea segeuridad
            if (resp.data.rol != '3') {
                //si es diferente al rol seguridad se envia una respuesta 403
                return res.status(403).json({
                    ok: false,
                    msg: 'No posee los permisos para realizar la accion'
                })
            }
            //si el rol es seguridad dejamos continuar con el siguiente middleware  
            next();
        }
    ).catch(
        err => {
            //si ocurre un error retornamos una respuesta 401
            return res.status(401).json({
                ok: false,
                msg: 'token invalido'
            });
        }
    )
}

//middleware que valida si el token enviado es del rol administrador
const validarJwtAdm = async (req: Request, res: Response, next: NextFunction) => {
    //traer variables enviadas en la peticion
    const token = req.header('x-token');
    //varificar que se envie el token
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
            //validamos que el rol sea administrador
            if (resp.data.rol != '2') {
                //si es diferente al rol seguridad se envia una respuesta 403
                return res.status(403).json({
                    ok: false,
                    msg: 'No posee los permisos para realizar la accion'
                })
            }
            //si el rol es seguridad dejamos continuar con el siguiente middleware  
            next();
        }
    ).catch(
        err => {
            //si ocurre un error retornamos una respuesta 401
            return res.status(401).json({
                ok: false,
                msg: 'token invalido'
            });
        }
    )
}

//middleware que valida si el token enviado es del rol seguridad o registros
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
            //validamos que el rol sea seguridad o registros
            if (resp.data.rol == '3' || resp.data.rol == '1') {
                //si es alguno de los dos sejamos continuar con el siguiente middleware
                next();
            } else {
                //si es diferente al rol seguridad o registros se envia una respuesta 403
                return res.status(403).json({
                    ok: false,
                    msg: 'No posee los permisos para realizar la accion'
                })
            }
        }
    ).catch(
        err => {
            //si ocurre un error retornamos una respuesta 401
            return res.status(401).json({
                ok: false,
                msg: 'token invalido'
            });
        }
    )
}
//exportamos los middlewares
export {
    validarJwtRegis,
    validarJwtSeg,
    validarJwtBoth,
    validarJwtAdm
}