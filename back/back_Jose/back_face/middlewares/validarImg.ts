/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import { NextFunction, Request, Response } from "express";
import { UploadedFile } from 'express-fileupload';

//middleware, valida que las imagenes enviadas tengan el formato requerido en la creación de una persona
const validarImgsCreate = (req: Request, res: Response, next: NextFunction) => {
    //validamos que se enviaron archivos
    if (!req.files || Object.keys(req.files).length === 0) {
        //retornamos un error 400
        return res.status(400).send('No files were uploaded.');
    }
    //añadimos a la constante img las imagenes enviadas
    const img = req.files.img;
    //validamos que se haya enviado las imagenes a través de img
    if (!img) {
        //retornamos error 400
        return res.status(400).json({
            ok: false,
            msg: 'img no enviado'
        })
    }
    //función que valida el formato y tamaño de las imagenes 
    const validar = (img: UploadedFile) => {
        //validar tamaño
        if (img.truncated) {
            //retornamos error 400
            return res.status(400).json({
                ok: false,
                msg: 'archivos no soportados'
            });
        }
        //creamos un array con el nombre de la imagen para obtener la extensión de la imagen
        const nombreCortado = img.name.split('.');
        //extraemos la extensión de la imagen
        const extensionImg = nombreCortado[nombreCortado.length - 1];
        //validamos la extensión de la imagen
        if (!extensionVal.includes(extensionImg)) {
            //retornamos error 400
            return res.status(400).json({
                ok: false,
                msg: 'extensiones no soportadas'
            });
        }
    }
    //constante que contiene las extensiones válidas
    const extensionVal = ['png', 'jpeg', 'gif', 'bmp', 'PNG', 'jpg'];
    //validamos si la constante img es un array
    if (Array.isArray(img)) {
        //validamos que se envién solo 3 imagenes
        if (img.length === 3) {
            //al ser un array creamos un ciclo para poder verificar cada una de las imagenes enviadas
            for (let i = 0; i < img.length; i++) {
                //llamamos a la función para validar las imagenes
                validar(img[i]);
            }
        } else {
            //retornamos error 400
            return res.status(400).json({
                ok: false,
                msg: 'tiene que enviar tres fotos para la creación de un person group person'
            });
        }

    } else {
        //retornamos error 400
        return res.status(400).json({
            ok: false,
            msg: 'tiene que enviar tres fotos para la creación de un person group person'
        });
    }
    //dejamos seguir con el siguiente middleware
    next();
}
//middleware, valida que las imagenes enviadas tengan el formato requerido
const validarImgs = (req: Request, res: Response, next: NextFunction) => {
    //validamos que se hayan enviado archivos
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    //añadimos a la constante img las imagenes enviadas
    const img = req.files.img;
    //validamos que se haya enviado las imagenes a través de img
    if (!img) {
        //retornamos error 400
        return res.status(400).json({
            ok: false,
            msg: 'img no enviado'
        })
    }
    //función que valida el formato y tamaño de las imagenes 
    const validar = (img: UploadedFile) => {
        //validar tamaño
        if (img.truncated) {
            //retornamos error 400 si excede el tamaño limite
            return res.status(400).json({
                ok: false,
                msg: 'archivos no soportados'
            });
        }
        //creamos un array con el nombre de la imagen para obtener la extensión de la imagen
        const nombreCortado = img.name.split('.');
        //extraemos la extensión de la imagen
        const extensionImg = nombreCortado[nombreCortado.length - 1];
        //validamos la extensión de la imagen
        if (!extensionVal.includes(extensionImg)) {
            //retornamos error 400
            return res.status(400).json({
                ok: false,
                msg: 'extensiones no soportadas'
            });
        }
    }
    //constante con las extensiones validas
    const extensionVal = ['png', 'jpeg', 'gif', 'bmp', 'PNG', 'jpg'];
    //validamos si la constante img es un array
    if (Array.isArray(img)) {
        //al ser un array creamos un ciclo para poder verificar cada una de las imagenes enviadas
        for (let i = 0; i < img.length; i++) {
            //llamamos a la función para validar cada imagen
            validar(img[i]);
        }
    } else {
        //llamamos a la función para validar la imagen
        validar(img);
    }
    //dejamos continuar con el siguiente middleware
    next();
}
//exportamos los middlewares
export {
    validarImgsCreate,
    validarImgs
}