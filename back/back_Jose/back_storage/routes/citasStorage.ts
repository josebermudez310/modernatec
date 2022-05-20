/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import { Router } from 'express';
import fileUpload from 'express-fileupload'

//importacion de controladores
import { deleteCitaImg, getCitaImg, updateCitaImg, uploadCitaImg } from '../controllers/citasStorage';

//importacion de middlewares
import { validarJwt, validarJwtBoth } from '../middlewares/validar-jwt';
import { validarCodigo } from '../middlewares/validarCodigo';
import { validarImgs } from '../middlewares/validarImg';

//inicializacion del router
export const routerCitasStorage = Router();
//express-fileUpload
routerCitasStorage.use(fileUpload());

routerCitasStorage.post('/:codigo', [validarJwt,validarCodigo,validarImgs], uploadCitaImg);//ruta para guardar la imagen de la cita
routerCitasStorage.put('/:codigo', [validarJwt,validarCodigo,validarImgs], updateCitaImg);//ruta para actualizar la imagen de una cita
routerCitasStorage.delete('/:codigo', [validarJwtBoth,validarCodigo], deleteCitaImg);//ruta para eliminar la imagen de una cita
routerCitasStorage.get('/:codigo/:img',[validarCodigo],getCitaImg);//ruta para obtener la imagen de la cita