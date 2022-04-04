import { Request, Response } from 'express';

import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { URL_APP } from '../global/environment';


const imgUpload = async(req: Request, res: Response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    //función para guardar las imagenes
    const guardar=(img:UploadedFile)=>{
        const nombreCortado = img.name.split('.');
        const extensionImg = nombreCortado[nombreCortado.length - 1];
        
        //Nombre unico
        const nombreImg = `${uuidv4()}.${extensionImg}`;

        //Guardar imagen
        const paths = `../upload/${id}/${nombreImg}`;
        console.log('guardando imagen');
        
        //mover la imagen
        img.mv(path.join(__dirname,paths), (err) => {
            if (err)
                return res.status(500).send(err);                
        });
    }

    //traer información enviada
    const id: string = req.params.id;
    const img = req.files.img;
    
    //verificar que la carpeta upload exista
    if(!fs.existsSync(path.join(__dirname,'../upload'))){
       await fs.mkdirSync(path.join(__dirname,`../upload`));
        console.log('creando carpeta upload');
        
    }

    //verificar que la carpeta exista
    if (!fs.existsSync(path.join(__dirname,`../upload/${id}`))) {
        console.log('creando carpeta imagnes id');
        
        await fs.mkdirSync(path.join(__dirname,`../upload/${id}`));
    }

    //Guardar imagenes según si hay ids
    if (Array.isArray(img)) {        
        for (let i = 0; i < img.length; i++) {
            guardar(img[1]);    
        }
    } else {
        guardar(img);
    }
    
    res.status(200).json({
        ok:true,
        msg:'Imagenes cargadas'
    });
}

//funcion que retorna todas las imagenes de un usuario 
const getImgs=(req:Request,res:Response)=>{
    const id:string = req.params.id;

    if ( !fs.existsSync(path.join(__dirname,`../upload/${id}`)) ){
        return res.status(400).json({
            ok:false,
            msg:'usuario sin imagenes'
        });
    }

    const archivos = fs.readdirSync(path.join(__dirname,`../upload/${id}`))
    
    const paths= archivos.map((el)=>{
        return  `${URL_APP}/api/storage/${id}/${el}`;
    });     
    res.status(200).json({
        ok:true,
        msg:'imagenes encontradas',
        paths
    });

    
}

const getImg=(req:Request,res:Response)=>{
    const img = req.params.img;
    const id  = req.params.id;
    const pathImg = path.join(__dirname,`../upload/${id}/${img}`)

    if(!fs.existsSync(pathImg)){
        return res.status(404).json({
            ok:false,
            msg:'not found'
        })
    }

    res.sendFile(pathImg);
    
}

export {
    imgUpload,
    getImgs,
    getImg
}
