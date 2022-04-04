//importaciones necesarias
import { Request, Response } from "express";
import { Conection } from "../db/config";

const setUrlImagen=async(req:Request,res:Response)=>{

    //traer variables enviadas en la peticion
    const numero_identificacion = req.body.numero_identificacion;
    const urlImgs:[string] =JSON.parse(req.body.urlImgs);
    
   
    
    //validar que se reciba las urls
    if(!Array.isArray(urlImgs)){
        return res.status(400).json({
            ok:false,
            msg:'el urlImgs es requerido y debe ser un array'
        })
    }

    //creacion de la coneccion
    const db = new Conection();
    //estabalecer coneccion con la base de datos
    db.conection.connect();
    //validar que el id enviado este registrado en la base de datos
    db.conection.query(`select * from users where numero_identificacion = ${numero_identificacion}`,(err,resp:[],field)=>{
        if(resp.length==0){
            return res.status(400).json({
                ok:false,
                msg:'Usuario no registrado'
            })
        }
    })    
    //establecer las imagenes al usuario
    db.conection.query(`update users set url_imagen='${urlImgs.toString()}'where numero_identificacion=${numero_identificacion}`,(err,resp)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                msg:'error no identificado'
            })
        }
    })
    //destruir la coneccion con la baase de datos
    db.destroy();
    //responder satisfactoriamente
    res.json({
        ok:true,
        msg:'imagenes del usuario añadidas'
    });
    
    
}

export {
    setUrlImagen
}