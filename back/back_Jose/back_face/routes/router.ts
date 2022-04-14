//importaciones necesarias
import { Router} from "express";
import fileUpload from 'express-fileupload';

//importacion de los controladores
import { addFacePersonGroupPerson, createPersonGroupPerson, deletePersonGroupPerson, getPerson, identifyPeronsGroupPersonBase64, identifyPersonGroupPerson, listPersonGroupPerson } from "../controllers/personGroupPerson";
import { setUrlImagen } from "../controllers/imagenDb";
import { createPersonGroup, deletePersonGroupId, listPersonGroup, listPersonGroupId, singledetect, trainPersonGroup } from "../controllers/personGroup";

//importacion de los middlewares
import { validarId } from "../middlewares/validarId";
import { validarImgs, validarImgsCreate } from "../middlewares/validarImg";
import { validarJwtBoth, validarJwtRegis, validarJwtSeg } from "../middlewares/validar-jwt";
import { validarFace } from "../middlewares/validarFace";

//inicializacion del router
export const router= Router();

//implementacion de fileUpload, carga de archivos
router.use(fileUpload({
    limits:{fileSize:6291456}
}));



//rutas para la gestión de person group
router.put('/persongroup',[validarJwtRegis],createPersonGroup);//ruta para la creación del grupo de personas
router.post('/persongroup',[validarJwtRegis],trainPersonGroup);//ruta para poner en entrenamiento la ia
router.get('/persongroup',[validarJwtRegis],listPersonGroup);//ruta para la obtención de todos los grupos de personas creados
router.get('/persongroup/:id_group',[validarJwtRegis],listPersonGroupId);//ruta para obtener la información de un grupo de personas en especifico
router.delete('/persongroup/:id_group',[validarJwtRegis],deletePersonGroupId);//ruta para eliminar un grupo de personas

//rutas para la gestión de person group person
router.put('/persongroupperson/:id',[validarJwtRegis,validarId,validarImgsCreate,validarFace],createPersonGroupPerson);//ruta para crear una nueva persona dentro del grupo de personas
router.post('/persongroupperson/:id',[validarJwtRegis,validarId,validarImgs,validarFace],addFacePersonGroupPerson);//ruta para agregar más rostros a una persona
router.get('/persongroupperson',[validarJwtRegis],listPersonGroupPerson);//ruta para obtener todas las personas 
router.get('/persongrouppersonid/',[validarJwtBoth],getPerson);//ruta para obtener una persona en específico
router.delete('/persongroupperson/:id',[validarJwtRegis,validarId],deletePersonGroupPerson);//ruta para borrar una persona del grupo de personas

//rutas para la identificación
router.post('/singledetect',[validarImgs],singledetect);//ruta para obtener las características de una cara en una foto
router.post('/identifyperson',[validarJwtSeg,validarImgs,validarFace],identifyPersonGroupPerson);//ruta para identificar una cara de una foto con las personas creadas

router.post('/identifypersonbase64',[validarJwtSeg],identifyPeronsGroupPersonBase64);//ruta para identificar una cara con las personas creadas, desde un base64


//rutas para la gestion de base de datos
router.post('/setimagenes',[validarJwtRegis,validarId],setUrlImagen)//ruta para establecer las imagenes a la base de datos