/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import { Request, Response } from "express";
import { ApiKeyCredentials } from '@azure/ms-rest-js'
import { FaceClient } from '@azure/cognitiveservices-face';
import { UploadedFile } from "express-fileupload";
//importacion de variables de entorno
import { ENDPOINT_FACE, GROUP_ID, KEY_FACE } from "../global/environment";

//función, detecta caras de una sola imagen
const singledetect = (req: Request, res: Response) => {
    //validar que se envió una foto
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    //establecer el valor de la constante img de las imagenes enviadas
    const img = req.files.img;
    //creamos las credenciales para acceder al servicio face api
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    //creamos el cliente de face api con las credenciales y el punto de conexión
    const client = new FaceClient(credentials, ENDPOINT_FACE);
    //función que detecta caras de una imagen
    const sigleDetectedFace = async (img: UploadedFile) => {
        //enviamos el array buffer al servicio de detección de caras
        await client.face.detectWithStream(img.data, { returnRecognitionModel: true, recognitionModel: "recognition_04", detectionModel: "detection_03" }).then((faces) => {
            //respondemos satisfactoriamente
            res.status(200).json({
                ok: true,
                msg: 'Cara encontrada',
                faces
            });
        }).catch((err) => {
            //si ocurre un error retornamos error 500
            res.status(500).json({
                ok: false,
                msg: 'Error al detectar cara'
            })
        });
    }
    if (Array.isArray(img)) {
        //si la constante img es un array retornamos error 400
        return res.status(400).json({
            ok: false,
            msg: 'para esta función debe enviar solo una foto'
        })
    } else {
        //enviamos a la función de deteción de caras
        sigleDetectedFace(img);
    }
}
//función, crea un grupo de personas
const createPersonGroup = async (res: Response) => {
    //creamos las credenciales para acceder al servicio face api
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    //creamos el cliente de face api con las credenciales y el punto de conexión
    const client = new FaceClient(credentials, ENDPOINT_FACE);
    //establecemos a la constante group el id que le queremos dar al nuevo grupo
    const group = GROUP_ID;
    //llamamos al servicio para crear el grupo de personas
    await client.personGroup.create(group, group, { recognitionModel: "recognition_04" }).then(() => {
        //si todo sale bien respondemos satisfactoriamente
        res.json({
            ok: true,
            msg: 'Person group creado'
        });
    }).catch((err) => {
        //si ocurre algún error respondemos error 400
        res.status(400).json({
            ok: false,
            msg: 'Person group no creado'
        });
    })
}
//función, obtener todos los grupos de personas creados
const listPersonGroup = async (res: Response) => {
    //creamos las credenciales para acceder al servicio de face api
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    //creamos al cliente de face api con las credenciales y el punto de conexión
    const client = new FaceClient(credentials, ENDPOINT_FACE);
    //llamamos al servicio para obtener todos los grupos de personas creados
    await client.personGroup.list().then((data) => {
        // si todo sale bien respondemos satisfactoriamente
        res.json({
            ok: true,
            msg: 'Person groups encontrados',
            data
        });
    }).catch((err) => {
        //si ocurre un error respondemos error 500
        res.status(500).json({
            ok: false,
            msg: 'Eroor al encontrar person groups'
        })
    });
}
//función, obtener un solo grupo de personas
const listPersonGroupId = async (req: Request, res: Response) => {
    //creamos la constante con el id del grupo
    const id = req.params.id_group;
    //creamos las credenciales  para acceder al servicio de face api
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    //creamos al cliente de face api con las credenciales y el punto de conexión
    const client = new FaceClient(credentials, ENDPOINT_FACE);
    //llamamos al servicio para obtener a un grupo con el id especificado
    await client.personGroup.get(id).then((data) => {
        //si todo sale bien respondemos satisfactoriamente
        res.status(200).json({
            ok: true,
            msg: 'Person Group encontrado',
            data
        });
    }).catch((err) => {
        //si ocurre un error respondemos error 404
        res.status(404).json({
            ok: false,
            msg: 'Person group no encontrado',
        });
    });
}
//función, borrar un grupo de personas
const deletePersonGroupId = async (req: Request, res: Response) => {
    //creamos la constante con el id del grupo
    const id = req.params.id;
    //creamos las credenciales para acceder al servicio face api
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    //creamos el cliente de face api con las credenciales y el punto de conexión
    const client = new FaceClient(credentials, ENDPOINT_FACE);
    //llamamos al servicio para eliminar un grupo de personas
    await client.personGroup.deleteMethod(id).then((data) => {
        //si todo sale bien respondemos satisfactoriamente
        res.json({
            ok: true,
            msg: 'Person group eliminado'
        })
    }).catch((err) => {
        //si ocurre un error respondemos error 400
        res.status(400).json({
            ok: false,
            msg: 'No se pudo eliminar person group, asegurese de enviar el id correcto'
        });
    });
}
//función, poner en entrenamiento el grupo de personas
const trainPersonGroup = async (req: Request, res: Response) => {
    //creamos las credenciales para acceder al servicio de face api
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    //creamos al cliente de face api con las credenciales y el punto de conexión
    const client = new FaceClient(credentials, ENDPOINT_FACE);
    //llamamos al servicio para poner en entrenaiento el grupo de personas
    await client.personGroup.train(GROUP_ID).then((data) => {
        //si todo sale bien respondemos satisfactoriamente
        res.json({
            ok: true,
            msg: 'Person group entrenando',
            data
        });
    }).catch((err) => {
        //si ocurre un error respondemos error 500
        res.status(500).json({
            ok: false,
            msg: 'No se ha podido iniciar el entrenamiento',
            err
        })
    });
}
//exportamos las funciones del controlador
export {
    singledetect,
    createPersonGroup,
    listPersonGroup,
    listPersonGroupId,
    deletePersonGroupId,
    trainPersonGroup
}