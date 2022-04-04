//importaciones necesarias
import { Router} from "express";
import { createPersonGroup, deletePersonGroupId, listPersonGroup, listPersonGroupId, singledetect, trainPersonGroup } from "../controllers/personGroup";
import fileUpload from 'express-fileupload';

//importacion de los controladores
import { addFacePersonGroupPerson, createPersonGroupPerson, deletePersonGroupPerson, getPerson, identifyPeronsGroupPersonBase64, identifyPersonGroupPerson, listPersonGroupPerson } from "../controllers/personGroupPerson";
import { setUrlImagen } from "../controllers/imagenDb";
//importacion de los middlewares
import { validarId } from "../middlewares/validarId";
import { validarImgs, validarImgsCreate } from "../middlewares/validarImg";
import { validarJwt } from "../middlewares/validar-jwt";
import { validarFace } from "../middlewares/validarFace";
import { validarRegis, validarSeg } from "../middlewares/validarAutorizacion";

//inicializacion del router
export const router= Router();

//implementacion de fileUpload, carga de archivos
router.use(fileUpload({
    limits:{fileSize:6291456}
}));



//rutas para la gestión de person group
router.put('/persongroup',[validarJwt,validarRegis],createPersonGroup);
router.post('/persongroup',[validarJwt,validarRegis],trainPersonGroup);
router.get('/persongroup',[validarJwt,validarRegis],listPersonGroup);
router.get('/persongroup/:id',[validarJwt,validarRegis],listPersonGroupId);
router.delete('/persongroup/:id',[validarJwt,validarRegis],deletePersonGroupId);

//rutas para la gestión de person group person
router.put('/persongroupperson/:id',[validarJwt,validarRegis,validarId,validarImgsCreate,validarFace],createPersonGroupPerson);
router.post('/persongroupperson/:id',[validarJwt,validarRegis,validarId,validarImgs,validarFace],addFacePersonGroupPerson);
router.get('/persongroupperson',[validarJwt,validarRegis],listPersonGroupPerson);
router.get('/persongrouppersonid/',[validarJwt,validarSeg],getPerson);
router.delete('/persongroupperson/:id',[validarJwt,validarRegis,validarId],deletePersonGroupPerson);

//rutas para la identificación
router.post('/singledetect',[validarImgs],singledetect);
router.post('/identifyperson',[validarJwt,validarSeg,validarImgs,validarFace],identifyPersonGroupPerson);

router.post('/identifypersonbase64',[validarJwt,validarSeg,validarSeg],identifyPeronsGroupPersonBase64);


//rutas para la gestion de base de datos
router.post('/setimagenes',[validarJwt,validarRegis,validarId],setUrlImagen)