//importaciones necesarias
import { Router} from 'express';
import fileUpload from 'express-fileupload'

//controllers
import { getImgs, imgUpload } from '../controllers/storage';

//middlewarea
import { validarId } from '../middlewares/validarId';
import { validarImgs } from '../middlewares/validarImg';

export const routerStorage = Router();
//express-fileUpload
routerStorage.use(fileUpload({
    limits:{fileSize:6291456}
}));

routerStorage.post('/:id',[validarImgs,validarId],imgUpload);
routerStorage.get('/:id',[validarId],getImgs);