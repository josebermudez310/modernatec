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

//función, crear una persona dentro de un grupo de personas
const createPersonGroupPerson = async (req: Request, res: Response) => {
    //validamos que hayan enviado imagenes
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    //añadimos a la constante img las imagenes enviadas
    const img = req.files.img;
    //añadimos a la constante id el id de la persona
    const id: string = req.params.id;
    //creamos las credenciales para acceder al servicio de face api
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    //creamos el cliente de face api con las credenciales y el punto de conexión
    const client = new FaceClient(credentials, ENDPOINT_FACE);
    //obtenemos todas las personas que están registradas en el grupo de personas
    const personas = await client.personGroupPerson.list(GROUP_ID).then((data) => data);
    //creamos un ciclo para poder acceder a cada una de las personas registradas
    for (let i = 0; i < personas.length; i++) {
        //validamos que el id enviado no exista
        if (personas[i].name == id) {
            //si existe detenemos el ciclo
            i = personas.length
            //respondemos error 400
            return res.status(400).json({
                ok: false,
                msg: 'Usuario ya existente'
            });
        }
    }
    //llamamos al servicio para crear una nueva persona dentro de un grupo de personas
    const idPerson: any = await client.personGroupPerson.create(GROUP_ID, { name: id }).then(
        (data) => data//retornamos la data el cual contiene el id único que da el servicio face api a cada persona creada
    )
        .catch((err) => {
            //si ocurre un error respondemos un error 500
            res.status(500).json({
                ok: false,
                msg: 'no se ha podido crear person group person',
                err
            });
        });
    //función, para agregar caras a una persona de un grupo de personas
    const agregarCara = async (img: UploadedFile) => {
        //llamamos al servicio para agregar caras a una persona
        await client.personGroupPerson.addFaceFromStream(GROUP_ID, idPerson.personId, img.data, { detectionModel: "detection_03" })
            .catch((err) => {
                //si ocurre un error respondemos un error 500
                return res.status(500).json({
                    ok: false,
                    msg: 'no se puede agregar la cara',
                    err
                });
            });
    }

    //validamos si la constante img es un array
    if (Array.isArray(img)) {
        //como es un array creamos el ciclo para accedar a cada una de las imagenes
        for (let i = 0; i < img.length; i++) {
            //enviamos cada imagen a la función para agregar caras
            await agregarCara(img[i]);
        }
    }
    //respondemos satisfactoriamente
    res.json({
        ok: true,
        msg: 'Person group person añadido'
    });
}
//función para obtener todas las personas de un grupo de personas
const listPersonGroupPerson = async (res: Response) => {
    //creamos las credenciales para acceder al servicio de face api
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    //creamos el cliente de face api con las credenciales y el punto de conexión
    const client = new FaceClient(credentials, ENDPOINT_FACE);
    //llamamos al servicio para obtener todas las personas de un grupo de personas
    await client.personGroupPerson.list(GROUP_ID).then((data) => {
        // si todo sale correcto respondemos satisfactoriamente
        res.json({
            ok: true,
            msg: 'Personas encontradas',
            data
        });
    }).catch((err) => {
        //si ocurre un error respondemos error 500
        res.status(500).json({
            ok: false,
            msg: 'Personas no encontradas',
            err
        });
    })
}
//función para eliminar una persona de un grupo de personas
const deletePersonGroupPerson = async (req: Request, res: Response) => {
    //creamos las credenciales para acceder al servicio de face api
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    //creamos el cliente de face api con las credenciales y el punto de conexión
    const client = new FaceClient(credentials, ENDPOINT_FACE);
    //añadimos a la constante id el id de la persona
    const id: string = req.params.id;
    //creamos la constante persona id la cual es el id único que da el servicio face api a cada persona
    const personaId: any = await client.personGroupPerson.list(GROUP_ID).then((data) => {
        //esta variable contentra a la persona que tenga el id enviado
        let persona: any;
        //creamos el ciclo para poder acceder a cada una de las personas guardadas en face api
        for (let i = 0; i < data.length; i++) {
            //verificamos que el id coincida 
            if (data[i].name == id) {
                //si coincide añadimos a la variable persona el valor con el cual coincide el id enviado
                persona = data[i].personId;
            }
        }
        //retornamos la información de la persona encontrada
        return persona
    });
    //validamos que la persona con el id enviado exista dentro del servicio face api
    if (!personaId) {
        //si no existe respondemos error 400
        return res.status(400).json({
            ok: false,
            msg: `No existe una persona con id ${id}`
        });
    }
    //llamamos al servicio para eliminar una persona del grupo de personas
    await client.personGroupPerson.deleteMethod(GROUP_ID, personaId).then((data) => {
        //si todo sale correcto respondemos satisfactoriamente
        res.json({
            ok: true,
            msg: `persona eliminada ${id}`,
            data
        });
    }).catch((err) => {
        //si ocurre un error respondemos un error 500
        res.status(500).json({
            ok: false,
            msg: `No se pudo eliminar la persona ${id}`,
            err
        });
    });
}
//función para añadir caras a una persona de un grupo de personas
const addFacePersonGroupPerson = async (req: Request, res: Response) => {
    //validamos que se hayan enviado las imagenes
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    //añadimos a la constante img las imagenes enviadas
    const img = req.files.img;
    //creamos las credenciales para acceder al servicio de face api
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    //creamos el cliente de face api con las credenciales y el punto de conexión
    const client = new FaceClient(credentials, ENDPOINT_FACE);
    //añadimos a la constante id el id de la persona
    const id: string = req.params.id;
    //creamos la constante persona id la cual contendrá id único que da el servicio face api a cada persona
    const personaID: any = await client.personGroupPerson.list(GROUP_ID).then((data) => {
      //esta variable contentra a la persona que tenga el id enviado
      let persona: any;
      //creamos el ciclo para poder acceder a cada una de las personas guardadas en face api
      for (let i = 0; i < data.length; i++) {
          //verificamos que el id coincida 
          if (data[i].name == id) {
              //si coincide añadimos a la variable persona el valor con el cual coincide el id enviado
              persona = data[i].personId;
          }
      }
      //retornamos la información de la persona encontrada
      return persona
    });
    //validamos que exista una persona con el id enviado
    if (!personaID) {
        //si no existe una persona con el id enviado respondemos error 400
        return res.status(400).json({
            ok: false,
            msg: `Aún no se ha creado un person group person con el id ${id}`
        });
    }
    //funcion para agregar caras de una imagen
    const agregarCara = async (img: UploadedFile) => {
        //llamamos al servicio de face api para agregar una cara desde una imagen
        await client.personGroupPerson.addFaceFromStream(GROUP_ID, personaID.personId, img.data)
            .catch((err) => {
                //si ocurre un error respondemos error 500
                return res.status(500).json({
                    ok: false,
                    msg: 'no se puede agregar la cara',
                    err
                });
            });
    }
    //validamos si la constante es un array
    if (Array.isArray(img)) {
        //creamos un ciclo para acceder a cada una de las imagenes
        for (let i = 0; i < img.length; i++) {
            //llamamos a la función para agregar caras desde una imagen
            await agregarCara(img[i]);
        }
    } else {
        //llamamos a la función para agregar caras desde una imagen
        await agregarCara(img)
    }
    //respondemos satisfactoriamente
    res.json({
        ok: true,
        msg: 'se agregaron las nuevas imagenes'
    });
}
//función para identificar una persona desde una imagen
const identifyPersonGroupPerson = async (req: Request, res: Response) => {
    //validamos que se haya enviado una imagen
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    //añadimos a la constante img las imagenes enviadas
    const img = req.files.img;
    //creamos las credenciales para el servico de face api
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    //creamos el cliente de face api con las credenciales y el punto de conexión
    const client = new FaceClient(credentials, ENDPOINT_FACE);
    //añadimos a la constante id el id del usuario
    const id: string = req.params.id;
    //variable que contendra la información de las caras detectadas de la imagen enviada
    let groupFacesIdentify: any
    //validamos que la constante img no sea un array
    if (!Array.isArray(img)) {
        //llamamos al servicio de face api para detectar caras con el array buffer de la imagen enviada
        groupFacesIdentify = await client.face.detectWithStream(img.data, { recognitionModel: "recognition_04", detectionModel: "detection_03" }).then((data) => {
            //constante que tendra todas las caras detectadas
            const faceIds = new Array();
            //realizamos ciclo para acceder a cada una de las caras detectadas
            for (let face of data) {
                //insertamos la información de cada cara en la constante
                faceIds.unshift(face.faceId);
            }
            //filtramos para que no hayan campos vacios en el array
            const filterIds = faceIds.filter((id) => {
                //retornamos si el id es diferente a null
                return id != null;
            });
            //retornamos todas las caras detectadas
            return filterIds;
        }).catch((err) => {
            //si ocurre un error retornamos error 400
            return res.status(400).json({
                ok: false,
                msg: 'No se encontraron caras',
                err
            });
        });
    }else{
        //si no es un array retornamos error 400
        return res.status(400).json({
            ok:false,
            msg:'solo tiene que enviar una imagen para hacer la identificación'
        })
    }
    //llamamos al servicio de face api para hacer la identificación 
    await client.face.identify(groupFacesIdentify, { personGroupId: GROUP_ID })
        .then((identifyResults) => {
            //si todo sale bien respondemos satisfactoriamente
            res.json({
                ok: true,
                msg: 'Identificando persona',
                identifyResults
            });
        }).catch((err) => {
            //si ocurre un error respondemos error 500
            res.status(400).json({
                ok: false,
                msg: 'Ha ocurrido algo al intentar identificar una persona',
                err
            });
        })
}
//función para identificar una persona desde base64
const identifyPeronsGroupPersonBase64 = async (req: Request, res: Response) => {
    //añadimos a la constante img el base64 enviado
    const img = req.body.img;
    //creamos las credenciales para el servicio face api
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    //creamos el cliente de face api con las credenciales y el punto de conexión
    const client = new FaceClient(credentials, ENDPOINT_FACE);
    //creamos un nuevo buffer del base64
    let buff = Buffer.from(img, 'base64');
    //variable que contendra la información de las caras detectadas de la imagen enviada
    let groupFacesIdentify: any
    //llamamos al servicio de face api para detectar caras con el buffer creado
    groupFacesIdentify = await client.face.detectWithStream(buff, { recognitionModel: "recognition_04", detectionModel: "detection_03" }).then((data) => {
       //constante que tendra todas las caras detectadas
       const faceIds = new Array();
       //realizamos ciclo para acceder a cada una de las caras detectadas
       for (let face of data) {
           //insertamos la información de cada cara en la constante
           faceIds.unshift(face.faceId);
       }
       //filtramos para que no hayan campos vacios en el array
       const filterIds = faceIds.filter((id) => {
           //retornamos si el id es diferente a null
           return id != null;
       });
       //retornamos todas las caras detectadas
       return filterIds;
    }).catch((err) => {
        //si ocurre un error respondemos error 400
        return res.status(400).json({
            ok: false,
            msg: 'No se encontraron caras',
            err
        });
    });
    //validamos que se hayan encontrado caras
    if(groupFacesIdentify.length==0){
        //si no se encontraron caras respondemos error 400
        return res.status(400).json({
            ok:false,
            msg:'no se encontraron caras'
        })
    }
    //llamamos al servicio de face api para hacer la identificación 
    await client.face.identify(groupFacesIdentify, { personGroupId: GROUP_ID })
        .then((identifyResults) => {
            //si todo sale bien respondemos satisfactoriamente
            return res.json({
                ok: true,
                msg: 'Identificando persona',
                identifyResults
            });
        }).catch((err) => {
            //si ocurre un error respondemos error 400
            return res.status(400).json({
                ok: false,
                msg: 'Ha ocurrido algo al intentar identificar una persona',

            });
        })

}
//función para obtener el numero de identificación de una persona
const getPerson = async (req: Request, res: Response) => {
    //constante que tendrá el id único que da face api a cada persona
    const idPerson: any = req.query.idperson;
    //validamos que se haya enviado el id
    if (!idPerson) {
        //si no se ha envidao el id respondemos error 400
        return res.status(400).json({
            ok: false,
            msg: 'no se ha enviado un id'
        })
    }
    //creamos las credenciales para el servicio de face api
    const credentials = new ApiKeyCredentials({
        inHeader: { 'Ocp-Apim-Subscription-Key': KEY_FACE }
    });
    //creamos el cliente para face api con las credenciales y el punto de conexión
    const client = new FaceClient(credentials, ENDPOINT_FACE);
    //llamamos al servicio de face api para traer una persona con su id único
    await client.personGroupPerson.get(GROUP_ID, idPerson).then(
        (data) => {
            //si todo sale bien respondemos satisfactoriamente
            res.json({
                ok: true,
                msg: 'Persona encontrada',
                identificacion: data.name
            })
        }
    ).catch(
        (err) => {
            //si ocurre un error respondemos error 400
            res.status(400).json({
                ok: false,
                msg: 'no se encontro la persona'
            })
        }
    )
}
//exportamos las funciones del controlador
export {
    createPersonGroupPerson,
    listPersonGroupPerson,
    deletePersonGroupPerson,
    addFacePersonGroupPerson,
    identifyPersonGroupPerson,
    identifyPeronsGroupPersonBase64,
    getPerson
}