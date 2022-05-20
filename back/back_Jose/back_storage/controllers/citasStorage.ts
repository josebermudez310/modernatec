/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import { Request, Response } from "express";
import { UploadedFile } from 'express-fileupload';
import path from 'path';
import { URL_APP } from '../global/environment';
import { Conection } from '../db/config';

//función para asignar una url a la base de datos
const setUrlImg = (codigo: string, nombreImg: string) => {
    //path para obtener la imagen de la cita
    const path = `${URL_APP}/api/citasstorage/${codigo}/${nombreImg}`;
    //creamos la conexión con la base de datos
    const conection = new Conection();
    //retornamos una promesa resuelve un boleano
    return new Promise<boolean>((resolve, reject) => {
        conection.conection.query(`update citas set url_imagen='${path}' where codigo_cita=${codigo}`, (err, resp) => {
            if (err) {
                console.log(err);
                
                //si ocurre un error retornamos false            
                reject(false);
            } else {
                //si todo ocurre bien retornamos true
                resolve(true);
            }
        })
    });
}

//función que guarda la imagen de una cita y añade en la base de datos la url de la imagen
const uploadCitaImg = async (req: Request, res: Response) => {
    //validamos que se hayan enviado las imagenes
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    //constante con el codigo de la cita
    const codigo = req.params.codigo
    //constante con la imagen enviada
    const img = req.files.img;
    //verificar que la carpeta upload exista
    if (!fs.existsSync(path.join(__dirname, '../upload'))) {
        //si no existe la carpeta upload la creamos
        fs.mkdirSync(path.join(__dirname, `../upload`));
    }
    //verificar que la carpeta citas exista
    if (!fs.existsSync(path.join(__dirname, `../upload/citas`))) {
        //si no existe la carpeta del usuario la creamos
        fs.mkdirSync(path.join(__dirname, `../upload/citas`));
    }

    //verificar que la carpeta de la cita exista
    if (!fs.existsSync(path.join(__dirname, `../upload/citas/${codigo}`))) {
        //si no existe la carpeta del usuario la creamos
        fs.mkdirSync(path.join(__dirname, `../upload/citas/${codigo}`));
    } else {
        //si la cita ya tiene una imagen respondemos error 400
        return res.status(400).json({
            ok: false,
            msg: 'Esta cita ya tiene una imagen'
        })
    }
    //función para guardar la imagen
    const guardar = async (img: UploadedFile) => {
        //creamos un array con el nombre de la imagen para obtener la extensión de la imagen
        const nombreCortado = img.name.split('.');
        //extraemos la extensión de la imagen
        const extensionImg = nombreCortado[nombreCortado.length - 1];
        //generamos el nombre único y le añadimos la extensión de la imagen
        const nombreImg = `${uuidv4()}.${extensionImg}`;
        //generamos el path en donde será guardada la imagen
        const paths = `../upload/citas/${codigo}/${nombreImg}`;
        //mover la imagen
        img.mv(path.join(__dirname, paths), (err) => {
            if (err)
                //si ocurre un error respondemos error 500
                return res.status(500).send(err);
        });
        //llamamos a la funcion para guardar la url en la base de datos
        await setUrlImg(codigo, nombreImg).then(resp => {
            //si todo ocurre correctamente respondemos satisfactoriamente
            return res.json({
                ok: true,
                msg: 'imagen subida correctamente'
            })
        }).catch(
            err => {
                //si ocurre un error
                //eliminamos la imagen subida
                fs.unlinkSync(path.join(__dirname, `../upload/citas/${codigo}/${nombreImg}`));
                //eliminamos la carpeta de la cita
                fs.rmdirSync(path.join(__dirname, `../upload/citas/${codigo}`))
                //respondemos error 500
                return res.status(500).json({
                    ok: false,
                    msg: 'error al guardar la url en la base de datos'
                })
            }
        );

    }
    //validamos que la constante img no sea un array
    if (Array.isArray(img)) {
        //si es un array respondemos error 400
        return res.status(400).json({
            ok: false,
            msg: 'solo se debe enviar una imagen'
        })
    } else {
        //si no es un array guardamos la imagen
        await guardar(img);
    }

}
//función que actualiza la imagen de una cita y actualiza en la base de datos la url de la imagen
const updateCitaImg = async (req: Request, res: Response) => {
    //validamos que se hayan enviado las imagenes
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    //constante con el codigo de la cita
    const codigo = req.params.codigo
    //constante con la imagen enviada
    const img = req.files.img;
    //verificar que la carpeta de la cita exista
    if (!fs.existsSync(path.join(__dirname, `../upload/citas/${codigo}`))) {
        //si no existe la carpeta respondemos error 400
        return res.status(400).json({
            ok: false,
            msg: 'la cita no tiene imagenes para actualizar'
        })
    }
    //función para guardar la imagen
    const guardar = async (img: UploadedFile) => {
        //creamos un array con el nombre de la imagen para obtener la extensión de la imagen
        const nombreCortado = img.name.split('.');
        //extraemos la extensión de la imagen
        const extensionImg = nombreCortado[nombreCortado.length - 1];
        //generamos el nombre único y le añadimos la extensión de la imagen
        const nombreImg = `${uuidv4()}.${extensionImg}`;
        //generamos el path en donde será guardada la imagen
        const paths = `../upload/citas/${codigo}/${nombreImg}`;
        //obtenemos la imagen anterior
        const imagen = fs.readdirSync(path.join(__dirname, `../upload/citas/${codigo}`));
        //mover la imagen
        img.mv(path.join(__dirname, paths), (err) => {
            if (err)
                //si ocurre un error respondemos error 500
                return res.status(500).send(err);
        });
        //llamamos a la funcion para guardar la url en la base de datos
        await setUrlImg(codigo, nombreImg).then(resp => {
            //si todo ocurre correctamente
            //eliminamos la imagen anterior 
            fs.unlinkSync(path.join(__dirname, `../upload/citas/${codigo}/${imagen[0]}`))
            //respondemos satisfactoriamente
            return res.json({
                ok: true,
                msg: 'imagen actualizada correctamente'
            })
        }).catch(
            err => {
                //si ocurre un error
                //eliminamos la imagen subida
                fs.unlinkSync(path.join(__dirname, `../upload/citas/${codigo}/${nombreImg}`));
                //respondemos error 500
                return res.status(500).json({
                    ok: false,
                    msg: 'error al guardar la url en la base de datos'
                })
            }
        );

    }
    //validamos que la constante img no sea un array
    if (Array.isArray(img)) {
        //si es un array respondemos error 400
        return res.status(400).json({
            ok: false,
            msg: 'solo se debe enviar una imagen'
        })
    } else {
        //si no es un array guardamos la imagen
        await guardar(img);
    }

}
//función que elimina del servidor la imagen de una cita
const deleteCitaImg = (req: Request, res: Response) => {
    //constante con el id del usuario
    const codigo = req.params.codigo;
    //validamos que la cita tenga una imagen asociada
    if (!fs.existsSync(path.join(__dirname, `../upload/citas/${codigo}`))) {
        //si no existe la carpeta respondemos error 400
        return res.status(400).json({
            ok: false,
            msg: 'la cita no tiene imagenes para eliminar'
        })
    }
    //obtenemos la imagen de la cita
    const imagen = fs.readdirSync(path.join(__dirname, `../upload/citas/${codigo}`));
    //eliminamos la imagen de la cita
    fs.unlinkSync(path.join(__dirname, `../upload/citas/${codigo}/${imagen[0]}`));
    //eliminamos la carpeta de la cita
    fs.rmdirSync(path.join(__dirname, `../upload/citas/${codigo}`));
    //respondemos satisfactoriamente
    res.json({
        ok:true,
        msg:'imagen de la cita eliminada'
    })
}
//función para obtener la imagen de una cita
const getCitaImg = (req: Request, res: Response) => {
    //constante con el nombre de la imagen
    const img = req.params.img;
    //constante con el id del usuario
    const codigo = req.params.codigo;
    //constante con la ubicación de la imagen en el servidor
    const pathImg = path.join(__dirname, `../upload/citas/${codigo}/${img}`)
    //validamos que exista la imagen
    if (!fs.existsSync(pathImg)) {
        //si no existe retornamos error 400
        return res.status(404).json({
            ok: false,
            msg: 'not found'
        })
    }
    //respondemos enviando la imagen
    res.sendFile(pathImg);
}
//exportación de las funciones del controlador
export {
    uploadCitaImg,
    updateCitaImg,
    deleteCitaImg,
    getCitaImg
}