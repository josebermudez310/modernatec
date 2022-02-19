//importaciones necesarias
import { Router} from 'express';
import fileUpload from 'express-fileupload'
import { imgUpload } from '../controllers/storage';

export const routerStorage = Router();
//express-fileUpload
routerStorage.use(fileUpload({
    limits:{fileSize:6291456}
}));

routerStorage.post('/:id',imgUpload);