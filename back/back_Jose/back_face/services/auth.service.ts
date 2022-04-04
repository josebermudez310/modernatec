//importaciones necesarias
import axios from "axios";
import { URL_BASE_AUTH, URL_BASE_USER } from '../global/environment';

export class AuthService{
    verificarToken(token:string){
        return axios.post(`${URL_BASE_AUTH}/me`,{token});
    }
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
