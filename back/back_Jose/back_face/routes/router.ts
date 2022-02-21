//importaciones necesarias
import { Router} from "express";
import { singledetect } from "../controllers/face";
import fileUpload from 'express-fileupload';

export const router= Router();

router.use(fileUpload({
    limits:{fileSize:6291456}
}));

router.post('/singledetect',singledetect) 