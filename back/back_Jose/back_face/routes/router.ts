//importaciones necesarias
import { Router} from "express";
import { createPersonGroup, deletePersonGroupId, listPersonGroup, listPersonGroupId, singledetect, trainPersonGroup } from "../controllers/personGroup";
import fileUpload from 'express-fileupload';
import { addFacePersonGroupPerson, createPersonGroupPerson, deletePersonGroupPerson, getPerson, identifyPeronsGroupPersonBase64, identifyPersonGroupPerson, listPersonGroupPerson } from "../controllers/personGroupPerson";
import { validarId } from "../middlewares/validarId";
import { validarImgs, validarImgsCreate } from "../middlewares/validarImg";
import { validarJwt } from "../middlewares/validar-jwt";
import { validarFace } from "../middlewares/validarFace";

export const router= Router();

router.use(fileUpload({
    limits:{fileSize:6291456}
}));



//rutas para la gestión de person group
router.put('/persongroup',createPersonGroup);
router.post('/persongroup',trainPersonGroup);
router.get('/persongroup',listPersonGroup);
router.get('/persongroup/:id',listPersonGroupId);
router.delete('/persongroup/:id',deletePersonGroupId);

//rutas para la gestión de person group person
router.put('/persongroupperson/:id',[validarId,validarImgsCreate,validarFace],createPersonGroupPerson);
router.post('/persongroupperson/:id',[validarId,validarImgs,validarFace],addFacePersonGroupPerson);
router.get('/persongroupperson',listPersonGroupPerson);
router.get('/persongrouppersonid/',getPerson);
router.delete('/persongroupperson/:id',[validarId],deletePersonGroupPerson);

//rutas para la identificación
router.post('/singledetect',[validarImgs],singledetect);
router.post('/identifyperson',[validarImgs,validarFace],identifyPersonGroupPerson);

router.post('/identifypersonbase64',[],identifyPeronsGroupPersonBase64);


/*
tercer país mas largo 
un niño nace cada 9 y uno muere cada 11
inmigración
666 segundos ingresan inmigrates 
diversidad
conquistado por inglaterra
latinos, africanos, asiaticos
descrito como: olla hiviendo una gran mezcla
cada estado tiene una cultura diferente


holidays: 
typical food: 
Buffalo Chicken Wings
Pizza
Tater Tots
Hot Dogs
Apple Pie
Barbecue Ribs
Reuben Sandwich
Biscuits and Gravy
Meatloaf
Grits
Hamburger
Cherry Pie
Chilli
Chowder
Coleslaw
Hushpuppies
Meatloaf
Thanksgiving Day Turkey
*/