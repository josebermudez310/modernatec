import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const bas_url = environment.url_back

@Injectable({
  providedIn: 'root'
})
export class ApiRegisterService {

  constructor(private http: HttpClient) { }

  //getRespuesta(){
    
    //return this.http.get<resultados>('http://127.0.0.1:8000/api/auth/register')

 // }


  
  

  //* -> Metodo que enviara la info al back
  register(data: {name: string,apellidos: string,telefono: string, email : string,numero_identificacion: string}) {
     
    const api: string = bas_url + "/auth/register"



     return this.http.post(api, data)
  }

}
