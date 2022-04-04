//importaciones necesarias
import { Router} from 'express';
import fileUpload from 'express-fileupload'

//controllers
import { getImg, getImgs, imgUpload } from '../controllers/storage';

//middleware
import { validarId } from '../middlewares/validarId';
import { validarImgs } from '../middlewares/validarImg';
import { validarJwt } from '../middlewares/validar-jwt';
import { validarRegis } from '../middlewares/validarAutorizacion';

export const routerStorage = Router();
//express-fileUpload
routerStorage.use(fileUpload({
    limits:{fileSize:6291456}
}));
//rutas para la gestión de las imagenes
routerStorage.post('/:id',[validarJwt,validarRegis,validarImgs,validarId],imgUpload);
routerStorage.get('/:id',[validarJwt,validarRegis,validarId],getImgs);
routerStorage.get('/:id/:img',getImg);
