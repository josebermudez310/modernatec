/**
 * @author Jose Daniel Bermudez Salamanca
 */

//importaciones necesarias
import { FaceClient } from "@azure/cognitiveservices-face";
import { ApiKeyCredentials } from "@azure/ms-rest-js";
import { NextFunction, Request, Response } from "express";
//importación de variables de entorno
import { ENDPOINT_FACE, KEY_FACE } from "../global/environment";

//middleware, valida que las imagenes contengan caras de personas
const validarFace = async (req: Request, res: Response, nex: NextFunction) => {
    //validar que se envió una foto
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    //constante que contendrá las imagenes enviadas
    const img = req.files.img
    //creamos las credenciales para acceder al servicio face api
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    //creamos el cliente de face api con las credenciales y el punto de conexión
    const client = new FaceClient(credentials, ENDPOINT_FACE);
    //validamos si la constante img es un array
    if (Array.isArray(img)) {
        //al ser un array creamos un ciclo para poder verificar cada una de las imagenes enviadas
        for (let i = 0; i < img.length; i++) {
            //enviamos el array buffer de cada imagen al servicio de detección de caras
            await client.face.detectWithStream(img[i].data, { recognitionModel: "recognition_04", detectionModel: "detection_03" }).then((data) => {
                //verificamos que se haya detectado solo una cara 
                if (!data[0] || data.length > 1) {
                    //si no se detecta una sola cara se establece la variable para que rompa el ciclo for
                    i = img.length + 3
                    //retornamos un error 400
                    return res.status(400).json({
                        ok: false,
                        msg: 'asegurese de enviar imagenes con un solo rostro'
                    });
                }
                //validamos que el ciclo está por terminar
                if (i == img.length - 1) {
                    //dejamos continuar con el siguiente middleware
                    nex();
                }
            }).catch(
                err => {
                    //si ocurre un error retornamos un error 400
                    return res.status(400).json({
                        ok: false,
                        msg: 'error al detectar caras'
                    })
                }
            );
        }
    } else {
        //enviamos el array buffer de la imagen al servicio de detección de caras
        await client.face.detectWithStream(img.data, { recognitionModel: "recognition_04", detectionModel: "detection_03" }).then((data) => {
            //verificamos que se haya detectado solo una cara
            if (!data[0] || data.length > 1) {
                //retornamos un error 400
                return res.status(400).json({
                    ok: false,
                    msg: 'asegurese de enviar una imagen con un rostro'
                });
            } else {
                //dejamos continuar con el siguiente middleware
                nex();
            }
        }).catch(
            err => {
                //si ocurre un error retornamos un error 400
                return res.status(400).json({
                    ok: false,
                    msg: 'error al detectar caras'
                })
            }
        );

    }
}
//exportamos el middleware
export {
    validarFace
}