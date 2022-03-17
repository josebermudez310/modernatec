//importaciones necesarias
import { Request, Response } from "express";
import { ApiKeyCredentials, HttpRequestBody } from '@azure/ms-rest-js'
import { FaceClient } from '@azure/cognitiveservices-face';
import { ENDPOINT_FACE, GROUP_ID, KEY_FACE } from "../global/environment";
import { UploadedFile } from "express-fileupload";







const createPersonGroupPerson=async(req:Request,res:Response)=>{
    
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const img = req.files.img;
    const id: string = req.params.id;

    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });

    const client = new FaceClient(credentials,ENDPOINT_FACE);

    const personas = await client.personGroupPerson.list(GROUP_ID).then((data)=>data);

    
    
    for (let i=0; i<personas.length; i++){
        if(personas[i].name==id){
            i = personas.length
            return res.status(400).json({
                ok:false,
                msg:'Usuario ya existente'
            });
        }
    }
    
    const idPerson:any = await client.personGroupPerson.create(GROUP_ID,{name:id}).then((data)=>data)
        .catch((err)=>{
            res.json({
                ok:true,
                msg:'no se ha podido crear person group person',
                err
            }); 
        });
    
    const agregarCara=async(img:UploadedFile)=>{
        console.log('guardando');        
        await client.personGroupPerson.addFaceFromStream(GROUP_ID,idPerson.personId,img.data,{detectionModel:"detection_03"}).then((data)=>console.log(data))
            .catch((err)=>{
                return    res.status(404).json({
                    ok:false,
                    msg:'no se puede agregar la cara',
                    err
                });
            });
    }
    

    if(Array.isArray(img)){
        for(let i=0;i<img.length;i++){
            console.log(i);            
            await agregarCara(img[i]);
        }
    }
    res.json({
        ok:true,
        msg:'Person group person añadido'
    });
    
}

const listPersonGroupPerson=async(req:Request,res:Response)=>{

    
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });

    const client = new FaceClient(credentials,ENDPOINT_FACE);

    await client.personGroupPerson.list(GROUP_ID).then((data)=>{
        res.json({
            ok:true,
            msg:'Personas encontradas',
            data
        });
    }).catch((err)=>{
        res.json({
            ok:false,
            msg:'Personas no encontradas',
            err
        });
    })
}

const deletePersonGroupPerson=async(req:Request,res:Response)=>{
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });

    const client = new FaceClient(credentials,ENDPOINT_FACE);
    const id: string = req.params.id;

    const personaId:any = await client.personGroupPerson.list(GROUP_ID).then((data)=>{

        let persona:any;

        for (let i=0; i<data.length;i++){
            console.log(i);


            
            if(data[i].name==id){
                console.log(data[i]);
                
                persona= data[i].personId;
            }
        }
        return persona
    });

    console.log(personaId);
    

    

    if(!personaId){
        return res.status(400).json({
            ok:false,
            msg:`No existe una persona con id ${id}`
        });
    }
    
    await client.personGroupPerson.deleteMethod(GROUP_ID,personaId).then((data)=>{
        res.json({
            ok:true,
            msg:`persona eliminada ${id}`,
            data
        });
    }).catch((err)=>{
        res.status(404).json({
            ok:false,
            msg:`No se pudo eliminar la persona ${id}`,
            err
        });
    });
}

const addFacePersonGroupPerson=async(req:Request,res:Response)=>{
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const img = req.files.img;

    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });

    const client = new FaceClient(credentials,ENDPOINT_FACE);

    const id: string = req.params.id;

    const persona:any = await client.personGroupPerson.list(GROUP_ID).then((data)=>{
        const persona = data.map((element)=>{
            if(element.name==id){
                console.log(element);
                return element
            }
        });
        return persona
    });

    console.log(persona);
    
    if(!persona[0]){
        return res.status(400).json({
            ok:false,
            msg:`Aún no se ha creado un person group person con el id ${id}`
        });
    }

    const agregarCara=async(img:UploadedFile)=>{
        console.log('guardando');        
        await client.personGroupPerson.addFaceFromStream(GROUP_ID,persona[0].personId,img.data).then((data)=>console.log(data))
            .catch((err)=>{
                return    res.status(404).json({
                    ok:false,
                    msg:'no se puede agregar la cara',
                    err
                });
            });
    }

    if(Array.isArray(img)){
        for(let i=0;i<img.length;i++){
            console.log(i);            
            await agregarCara(img[i]);
        }
    }else{
        await agregarCara(img)
    }

    res.json({
        ok:true,
        msg:'se agregaron las nuevas imagenes'
    });
}

const identifyPersonGroupPerson=async(req:Request,res:Response)=>{

    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }

    const img = req.files.img;

    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });

    const client = new FaceClient(credentials,ENDPOINT_FACE);

    const id: string = req.params.id;

    let groupFacesIdentify:any

    if(!Array.isArray(img)){
        console.log(img.data);    
        groupFacesIdentify= await client.face.detectWithStream(img.data,{recognitionModel:"recognition_04",detectionModel:"detection_03"}).then((data)=>{
            const faceIds = new Array();

            console.log(data);
            

            for(let face of data){
                faceIds.unshift(face.faceId);    
            }

            console.log(`desde 240 ${faceIds}`);
            
            const filterIds = faceIds.filter((id)=>{
                return id != null;
            });

            return filterIds;
        }).catch((err)=>{
            return res.status(400).json({
                ok:false,
                msg:'No se encontraron caras',
                err
            });
        });        
    }

    console.log(groupFacesIdentify);    

    await client.face.identify(groupFacesIdentify,{personGroupId:GROUP_ID})
            .then((identifyResults)=>{
                console.log(identifyResults);
                res.json({
                    ok:true,
                    msg:'Identificando persona',
                    identifyResults
                });                
            }).catch((err)=>{
                console.log(err);
                res.status(400).json({
                    ok:false,
                    msg:'Ha ocurrido algo al intentar identificar una persona',
                    err
                });
            })

    
}

const identifyPeronsGroupPersonBase64=async(req:Request, res:Response)=>{
    const img = req.body.img;

    console.log(req.body);
    console.log(img);
    

    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });

    const client = new FaceClient(credentials,ENDPOINT_FACE);

    
    let buff = new Buffer (img,'base64');
    

    
    let groupFacesIdentify:any

    groupFacesIdentify = await client.face.detectWithStream(buff,{recognitionModel:"recognition_04",detectionModel:"detection_03"}).then((data)=>{
        const faceIds = new Array();

        for(let face of data){
            faceIds.unshift(face.faceId);    
        }

        console.log(`desde 240 ${faceIds}`);
        
        const filterIds = faceIds.filter((id)=>{
            return id != null;
        });

        return filterIds;
    }).catch((err)=>{
        return res.status(400).json({
            ok:false,
            msg:'No se encontraron caras'
        });
    });        

    
    await client.face.identify(groupFacesIdentify,{personGroupId:GROUP_ID})
            .then((identifyResults)=>{
                console.log(identifyResults);
                res.json({
                    ok:true,
                    msg:'Identificando persona',
                    identifyResults
                });                
            }).catch((err)=>{
                res.status(400).json({
                    ok:false,
                    msg:'Ha ocurrido algo al intentar identificar una persona',
                    
                });
            })
    
}

const getPerson=async(req:Request,res:Response)=>{

    console.log(req.query);
    

    const idPerson= req.query.idperson;

    console.log(idPerson);
    

    if(!idPerson){
        return res.status(400).json({
            ok:false,
            msg:'no se ha enviado un id'
        })
    }
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });

    const client = new FaceClient(credentials,ENDPOINT_FACE);
    await client.personGroupPerson.get(GROUP_ID,idPerson).then(
        (data)=>{
            res.json({
                ok:true,
                msg:'cara encontrada',
                identificacion: data.name
            })
        }
    ).catch(
        (err)=>{
            res.status(400).json({
                ok:false,
                msg:'no se encontro la cara'
            })
        }
    )
}

export {
    createPersonGroupPerson,
    listPersonGroupPerson,
    deletePersonGroupPerson,
    addFacePersonGroupPerson,
    identifyPersonGroupPerson,
    identifyPeronsGroupPersonBase64,
    getPerson
}