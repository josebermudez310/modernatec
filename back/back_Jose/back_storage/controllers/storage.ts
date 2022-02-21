import { Request, Response } from 'express';

import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { UploadedFile } from 'express-fileupload';
import path from 'path';


const imgUpload = (req: Request, res: Response) => {

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
        const path = `./uploads/${id}/${nombreImg}`;

        //mover la imagen
        img.mv(path, (err) => {
            if (err)
                return res.status(500).send(err);                
        });
    }

    //traer información enviada
    const id: string = req.params.id;
    const img = req.files.img;

    //verificar que la carpeta exista
    if (!fs.existsSync(`./uploads/${id}`)) {
        fs.mkdirSync(`./uploads/${id}`);
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

const getImgs=(req:Request,res:Response)=>{
    const id:string = req.params.id;

    if ( !fs.existsSync(`./uploads/${id}`) ){
        res.status(400).json({
            ok:false,
            msg:'usuario sin imagenes'
        });
    }

    fs.readdir(`./uploads/${id}`,(err,archivos)=>{
        if(err){
            res.status(500).json({
                ok:false,
                msg:'error al leer los archivos'
            });
        }
        const paths= archivos.map((el)=>{
            return path.join(__dirname,`../../uploads/${id}/${el}`);
        });     
        res.status(400).json({
            ok:true,
            msg:'imagenes encontradas',
            paths
        });
        
    })


}

export {
    imgUpload,
    getImgs
}
