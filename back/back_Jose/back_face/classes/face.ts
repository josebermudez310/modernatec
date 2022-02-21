//importaciones necesarias

import { FaceClient } from "@azure/cognitiveservices-face";
import { FaceDetectWithStreamOptionalParams } from "@azure/cognitiveservices-face/esm/models";
import { ApiKeyCredentials } from '@azure/ms-rest-js';
import { UploadedFile } from "express-fileupload";
import { KEY_FACE, ENDPOINT_FACE } from '../global/environment';

export default class Face{
    private face:FaceClient;
    private credendtial:ApiKeyCredentials;

    constructor(){
        this.credendtial= new ApiKeyCredentials({
            inHeader: {'Ocp-Apim-Subscription-Key': KEY_FACE}
        });

        this.face= new FaceClient(this.credendtial,ENDPOINT_FACE)
    }

    singleDetectFace=async(img:UploadedFile)=>{
        const options:FaceDetectWithStreamOptionalParams={
            recognitionModel:"recognition_04",
            returnFaceAttributes:[
                "age",
                "accessories",
                "blur",
                "emotion",
                "exposure",
                "facialHair",
                "gender"
            ]
        }
        try {
            await this.face.face.detectWithStream(img.data,options).then((faces)=>{
                console.log(faces);
                
                return faces;
            })            
        } catch (error) {
            return error;
        }
    }

}