/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import { Request, Response } from 'express';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
//importación de variables de entorno
import { URL_APP } from '../global/environment';

//función, sube al servidor las imagenes enviadas
const imgUpload = async(req: Request, res: Response) => {
    //validamos que se hayan enviado las imagenes
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    //función para guardar una imagen
    const guardar=(img:UploadedFile)=>{
        //creamos un array con el nombre de la imagen para obtener la extensión de la imagen
        const nombreCortado = img.name.split('.');
        //extraemos la extensión de la imagen
        const extensionImg = nombreCortado[nombreCortado.length - 1];
        //generamos el nombre único y le añadimos la extensión de la imagen
        const nombreImg = `${uuidv4()}.${extensionImg}`;
        //generamos el path en donde será guardada la imagen
        const paths = `../upload/${id}/${nombreImg}`;
        
        //mover la imagen
        img.mv(path.join(__dirname,paths), (err) => {
            if (err)
                //si ocurre un error respondemos error 500
                return res.status(500).send(err);                
        });
    }

    //constante que contendrá el id de la persona
    const id: string = req.params.id;
    //constante que contendrá las imagenes enviadas
    const img = req.files.img;
    
    //verificar que la carpeta upload exista
    if(!fs.existsSync(path.join(__dirname,'../upload'))){
        //si no existe la carpeta upload la creamos
       fs.mkdirSync(path.join(__dirname,`../upload`));    
    }

    //verificar que la carpeta del usuario exista
    if (!fs.existsSync(path.join(__dirname,`../upload/${id}`))) {
        //si no existe la carpeta del usuario la creamos
        fs.mkdirSync(path.join(__dirname,`../upload/${id}`));
    }
    //validamos si la constante img es un array
    if (Array.isArray(img)) {        
        //creamos un ciclo para poder guardar cada una de las imagenes
        for (let i = 0; i < img.length; i++) {
            //llamamos la función para guardar la imagen
            guardar(img[i]);    
        }
    } else {
        //llamamos la función para guardar la imagen
        guardar(img);
    }
    //respondemos satisfactoriamente
    res.status(200).json({
        ok:true,
        msg:'Imagenes cargadas'
    });
}

//funcion que retorna todas las imagenes de un usuario 
const getImgs=(req:Request,res:Response)=>{
    //constante con el id del usuario
    const id:string = req.params.id;
    //Validamos que exista la carpeta de las imagenes del usuario
    if ( !fs.existsSync(path.join(__dirname,`../upload/${id}`)) ){
        //si no existe respondemos error 400
        return res.status(400).json({
            ok:false,
            msg:'usuario sin imagenes'
        });
    }
    //constante con las imagenes del usuario
    const archivos = fs.readdirSync(path.join(__dirname,`../upload/${id}`))
    //constante con las urls de las imagenes
    const paths= archivos.map((el)=>{
        //retornamos la url para poder acceder a cada imagen
        return  `${URL_APP}/api/storage/${id}/${el}`;
    });
    //respondemos satisfactoriamente
    res.status(200).json({
        ok:true,
        msg:'imagenes encontradas',
        paths
    });    
}
//función que retorna la imagen de un usuario
const getImg=(req:Request,res:Response)=>{
    //constante con el nombre de la imagen
    const img = req.params.img;
    //constante con el id del usuario
    const id  = req.params.id;
    //constante con la ubicación de la imagen en el servidor
    const pathImg = path.join(__dirname,`../upload/${id}/${img}`)
    //validamos que exista la imagen
    if(!fs.existsSync(pathImg)){
        //si no existe retornamos error 400
        return res.status(404).json({
            ok:false,
            msg:'not found'
        })
    }
    //respondemos enviando la imagen
    res.sendFile(pathImg);    
}
//exportamos las funciones del controlador
export {
    imgUpload,
    getImgs,
    getImg
}
