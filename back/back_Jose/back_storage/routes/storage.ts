/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import { Router} from 'express';
import fileUpload from 'express-fileupload'

//controllers
import { getImg, getImgPerfil, getImgs, imgPerfil, imgUpload } from '../controllers/storage';

//middleware
import { validarId } from '../middlewares/validarId';
import { validarImgs } from '../middlewares/validarImg';
import { validarJwt, validarJwtPerfil } from '../middlewares/validar-jwt';

//inicializacion del router
export const routerStorage = Router();
//express-fileUpload
routerStorage.use(fileUpload({
    limits:{fileSize:6291456}
}));
//rutas para la gestión de las imagenes
routerStorage.post('/:id',[validarJwt,validarId,validarImgs],imgUpload);//subir imagenes al servidor
routerStorage.get('/:id',[validarJwt,validarId],getImgs);//obtener todas las imagenes de un usuario
routerStorage.get('/:id/:img',getImg);//obtener una imagen de un usuario

//rutas para le gestion de las imagenes de perfil
routerStorage.put('/perfil/:id',[validarJwtPerfil,validarImgs],imgPerfil);//actualizar foto de perfil
routerStorage.get('/perfil/:id/:img',getImgPerfil)
