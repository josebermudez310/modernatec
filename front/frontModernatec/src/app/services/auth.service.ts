import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userToken:string;
  constructor(
    //importar srvicio http
    private http:HttpClient
    ) 
    {
      this.leerToken();
    }

  //url de la api
  protected url:string='http://127.0.0.1:8000/api/auth';

  login(data:{email:string,password:string}){
        return this.http.post(`${this.url}/login`,data).pipe(map((data:any)=>{          
          this.guardarToken(data.access_token);
          return data
        }))
  }

  //función para guardar token 
  private guardarToken( token:string )
  {
    //guardamos el token en el localstorage
    this.userToken = token;
    localStorage.setItem('token',token);

    let hoy = new Date();
    hoy.setSeconds(3600);
    localStorage.setItem('expira',hoy.getTime().toString());
  }
  //función para leer el token de localstorage
  leerToken()
  {
    if( localStorage.getItem('token') ){
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken='';
    }
    return this.userToken;
  }
  
  //función para destruir el token
  logout(){
    localStorage.removeItem('token');
  }

  //atenticación del token
  autenticar():boolean{  
    //verificar que haya un token en el local storage
    if(!(this.userToken.length>2)){
      return false;
    }
    //Extraer el timepo de expiracion del token
    const expira = Number(localStorage.getItem('expira'));
    //establecer el tiempo de expiracion del token
    const timeExpira = new Date();
    timeExpira.setTime(expira);    
    //Validar si el tiempo de expiración es correcto
    if(timeExpira > new Date()){
      return true;
    }else {
      return false;
    }
  }

}
