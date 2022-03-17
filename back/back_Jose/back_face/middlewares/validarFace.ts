//importaciones necesarias
import { FaceClient } from "@azure/cognitiveservices-face";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from 'express-fileupload';
import { ENDPOINT_FACE, KEY_FACE } from "../global/environment";

const validarFace =async(req:Request,res:Response,nex:NextFunction)=>{
    //validar que se envió una foto
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    const img = req.files.img

    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });

    const client = new FaceClient(credentials,ENDPOINT_FACE);

    

    if(Array.isArray(img)){
        for(let i = 0; i<img.length;i++){
            await client.face.detectWithStream(img[i].data,{recognitionModel:"recognition_04",detectionModel:"detection_03"}).then((data)=>{
                console.log(data.length);
                console.log(data);
                
                if(!data[0] || data.length>1){
                    i=img.length+3
                    return res.status(400).json({
                        ok:false,
                        msg:'asegurese de enviar una imagenes con un rostro'
                    });
                }
                if(i==img.length-1){
                    nex();
                }
            });
        }
    }else{
        
        await client.face.detectWithStream(img.data,{recognitionModel:"recognition_04",detectionModel:"detection_03"}).then((data)=>{
        console.log(data.length);
        console.log(data);
        
        if(!data[0]){
            return res.status(400).json({
                ok:false,
                msg:'asegurese de enviar una imagen con un rostro'
            });
        }else{
            nex();
        }
    });
        
    }
}

export {
    validarFace
}