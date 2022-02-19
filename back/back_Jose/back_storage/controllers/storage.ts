import { Request, Response } from 'express';

import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { UploadedFile } from 'express-fileupload';


export const imgUpload = (req: Request, res: Response) => {

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }


    const id: string = req.params.id;
    const img = req.files.img;

    const idsVal = ['1000161702', '1016943155', '1234567890']

    if (!idsVal.includes(id)) {
        return res.status(400).json({
            ok: false,
            msg: 'Usuario no existente'
        });
    }

    if (!fs.existsSync(`./uploads/${id}`)) {
        fs.mkdirSync(`./uploads/${id}`);
    }

    if (Array.isArray(img)) {
        let valid: boolean;
        for (let i = 0; i < img.length; i++) {
            if (img[i].truncated) {
                i = img.length + 1;
                valid = false;
            }

            const nombreCortado = img[i].name.split('.');
            const extensionImg = nombreCortado[nombreCortado.length - 1];

            //validar extensión 
            const extensionVal = ['png', 'jpeg', 'gif', 'bmp', 'PNG'];

            if (!extensionVal.includes(extensionImg)) {
                valid = false;
                i = img.length + 1;
            }
        }
        if (valid===false) {
            return res.status(400).json({
                ok: false,
                msg: 'archivos invalidos'
            });
        }

        for (let i = 0; i < img.length; i++) {
            console.log('guardando');
            
            const nombreCortado = img[i].name.split('.');
            const extensionImg = nombreCortado[nombreCortado.length - 1];
            //Nombre unico
            const nombreImg = `${uuidv4()}.${extensionImg}`;

            //Guardar imagen
            const path = `./uploads/${id}/${nombreImg}`;

            //mover la imagen
            img[i].mv(path, (err) => {
                if (err)
                    return res.status(500).send(err);                
            });
        }
        res.status(200).json({
            ok:true,
            msg:'Imagenes cargadas'
        });

    } else {

    }
    /*
//Nombre unico
const nombreImg = `${uuidv4()}.${extensionImg}`;
        
//Guardar imagen
const path= `./uploads/${nombreImg}`;

console.log(img);
//mover la imagen
img.mv(path,(err)=> {
    if (err)
      return res.status(500).send(err);

    res.json({
        ok:true,
        msg:'imagen subida'
    });
  });*/

}
