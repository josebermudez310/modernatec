/**
 * @author Jose Daniel Bermudez Salamanca
 */
//importaciones necesarias
import axios from "axios";
//importación de variables de entorno
import { URL_BASE_AUTH, URL_BASE_USER } from '../global/environment';

//creación de la clase que contendrá las funciones de autenticación
export class AuthService{
    //función que valida el token que reciba
    verificarToken(token:string){
        return axios.post(`${URL_BASE_AUTH}/me`,{token});
    }
    //función que retorna todos los ids de la base de datos
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
        ).catch(
            err=>{
                
            }
        )
    }
}
