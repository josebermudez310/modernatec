/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import { Router} from 'express';
import fileUpload from 'express-fileupload'

//controllers
import { getImg, getImgs, imgUpload } from '../controllers/storage';

//middleware
import { validarId } from '../middlewares/validarId';
import { validarImgs } from '../middlewares/validarImg';
import { validarJwt } from '../middlewares/validar-jwt';

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
