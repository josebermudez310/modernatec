import { NextFunction, Request, Response } from "express";
import { UploadedFile } from 'express-fileupload';


const validarImgsCreate=(req:Request,res:Response,next:NextFunction)=>{

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    
    const img = req.files.img;
    

    const validar=(img:UploadedFile)=>{
        //validar tamaño
        if (img.truncated) {
            return res.status(400).json({
                ok:false,
                msg:'archivos no soportados'
            });
        }
        //validar extension
        const nombreCortado = img.name.split('.');
        const extensionImg = nombreCortado[nombreCortado.length - 1];

        if (!extensionVal.includes(extensionImg)) {
            return res.status(400) .json({
                ok:false,
                msg:'extensiones no soportadas'
            });
         }
    }
    const extensionVal = ['png', 'jpeg', 'gif', 'bmp', 'PNG','jpg'];

    if (Array.isArray(img)) {     
        if(img.length===3){
            for (let i = 0; i < img.length; i++) {
                validar(img[i]);
            }
        }else{
            return res.status(400).json({
                ok:false,
                msg:'tiene que enviar tres fotos para la creación de un person group person'
            });
        }
        
    } else {
        return res.status(400).json({
            ok:false,
            msg:'tiene que enviar tres fotos para la creación de un person group person'
        });
    }
    next();
}

const validarImgs=(req:Request,res:Response,next:NextFunction)=>{

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    
    const img = req.files.img;
    

    const validar=(img:UploadedFile)=>{
        //validar tamaño
        if (img.truncated) {
            return res.status(400).json({
                ok:false,
                msg:'archivos no soportados'
            });
        }
        //validar extension
        const nombreCortado = img.name.split('.');
        const extensionImg = nombreCortado[nombreCortado.length - 1];

        if (!extensionVal.includes(extensionImg)) {
            return res.status(400) .json({
                ok:false,
                msg:'extensiones no soportadas'
            });
         }
    }
    const extensionVal = ['png', 'jpeg', 'gif', 'bmp', 'PNG','jpg'];

    if (Array.isArray(img)) {        
        for (let i = 0; i < img.length; i++) {
            validar(img[i]);
        }
    } else {
        validar(img);
    }
    next();
}

export {    
    validarImgsCreate,
    validarImgs
}