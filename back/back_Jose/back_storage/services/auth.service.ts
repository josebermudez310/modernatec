/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import axios from "axios";
//importación de variables de entorno
import { URL_BASE_AUTH, URL_BASE_USER } from '../global/environment';

//creación de la clase que contendrá las funciones de autenticación
export class AuthService{
    //función para verificar el token
    verificarToken(token:string){
        return axios.post(`${URL_BASE_AUTH}/me`,{token});
    }
    //obtener todos los ids de los usuarios de la base de datos
    getAllId(token:any){
        return axios.post(`${URL_BASE_USER}/index`,{token}).then(
            res=>{
                const data:[] = res.data;
                let ids:any=[];
                data.map((e:any)=>{
                    ids.push(e.numero_identificacion)
                });
                return ids;
            }
        )
    }
}
