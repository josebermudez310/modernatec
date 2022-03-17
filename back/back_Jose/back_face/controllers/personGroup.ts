import { Request, Response } from "express";
import { ApiKeyCredentials } from '@azure/ms-rest-js'
import { FaceClient } from '@azure/cognitiveservices-face';
import { ENDPOINT_FACE, GROUP_ID, KEY_FACE } from "../global/environment";
import { UploadedFile } from "express-fileupload";
import { PersonGroupCreateOptionalParams } from "@azure/cognitiveservices-face/esm/models";


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
        await client.face.detectWithStream(img.data,{returnRecognitionModel:true,recognitionModel:"recognition_04",detectionModel:"detection_03"}).then((faces)=>{
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
        //for(let i = 0; i<img.length; i++){
          //  singledetect(img[i]);
        //}
    }else{
        console.log(img.data);   
        sigleDetectedFace(img) ;
    }   
}


const createPersonGroup=async(req:Request,res:Response)=>{   
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    const options:PersonGroupCreateOptionalParams={
        recognitionModel:"recognition_04"
    }

    const client = new FaceClient(credentials,ENDPOINT_FACE);

    const group = GROUP_ID;

    await client.personGroup.create(group,group,{recognitionModel:"recognition_04"}).then(()=>{
        res.json({
            ok:true,
            msg:'Person group creado'
        });
    }).catch((err)=>{
        res.status(400).json({
            ok:false,
            msg:'Person group no creado'
        });
    })
}

const listPersonGroup=async(req:Request,res:Response)=>{
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    const client = new FaceClient(credentials,ENDPOINT_FACE);

    await client.personGroup.list().then((data)=>{
        console.log(data);        
        res.json({
            ok:true,
            msg:'Person groups encontrados',
            data
        });
    }).catch((err)=>{
        console.log(err);
    });    
}

const listPersonGroupId= async(req:Request,res:Response)=>{

    const id = req.params.id;
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    const client = new FaceClient(credentials,ENDPOINT_FACE);

    await client.personGroup.get(id).then((data)=>{
        res.status(200).json({
            ok:true,
            msg:'Person Group encontrado',
            data
        });
    }).catch((err)=>{
        res.status(404).json({
            ok:false,
            msg:'Person group no encontrado',
        });
    });
}

const deletePersonGroupId= async(req:Request, res:Response)=>{

    const id = req.params.id;
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    const client = new FaceClient(credentials,ENDPOINT_FACE);

    await client.personGroup.deleteMethod(id).then((data)=>{
        res.json({
            ok:true,
            msg:'Person group eliminado'
        })
    }).catch((err)=>{
        res.status(404).json({
            ok:false,
            msg:'No se pudo eliminar person group, asegurese de enviar el id correcto'
        });
    });

    res.json({
        ok:true,
        msg:'Borrando person group'
    });
}

const trainPersonGroup=async(req:Request,res:Response)=>{
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    const client = new FaceClient(credentials,ENDPOINT_FACE);

    await client.personGroup.train(GROUP_ID).then((data)=>{
        res.json({
            ok:true,
            msg:'Person group entrenando',
            data
        });
    }).catch((err)=>{
        res.json({
            ok:false,
            msg:'No se ha podido iniciar el entrenamiento',
            err
        })
    });
}
export {
    singledetect,
    createPersonGroup,
    listPersonGroup,
    listPersonGroupId,
    deletePersonGroupId,
    trainPersonGroup
}