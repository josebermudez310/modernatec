//importaciones necesarias
import axios from "axios";
import { URL_BASE_AUTH, URL_BASE_USER } from '../global/environment';

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
