import { Request, Response } from "express";
import { ApiKeyCredentials, HttpRequestBody } from '@azure/ms-rest-js'
import { FaceClient } from '@azure/cognitiveservices-face';
//const msRest = require("@azure/ms-rest-js");
//const Face = require("@azure/cognitiveservices-face");
import { ENDPOINT_FACE, KEY_FACE } from "../global/environment";
import { UploadedFile } from "express-fileupload";
import path from 'path';


const singledetect=(req:Request,res:Response)=>{
    //validar que se envió una foto
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const img = req.files.img;

    console.log(img);
        
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });

    const client = new FaceClient(credentials,ENDPOINT_FACE);

    const sigleDetectedFace = async(img:UploadedFile)=>{
        await client.face.detectWithStream(img.data,{RecognitionModel : "recognition_04",returnFaceAttributes:["age","smile","headPose","facialHair","emotion","hair","makeup","occlusion","accessories","blur","exposure","noise"]}).then((faces)=>{
            console.log(faces[0]); 
            res.status(200).json({
                ok:true,
                msg:'Cara encontrada',
                faces
            });
        }).catch((err)=>{
            console.log(err);            
        });
    }
    if(Array.isArray(img)){

    }else{
        console.log(img.data);   
        sigleDetectedFace(img) ;
    }
    
    
   
}

export {
    singledetect
}