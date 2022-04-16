import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment.prod';
import { HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class CitasService {

  userToken:string;
  url=environment.BASE_URL_CITAS;
  constructor(
    private http:HttpClient,
    private authService:AuthService
  ) { 
    this.userToken = authService.userToken;  
   }

  getCitas(){
    return this.http.post(`${this.url}/index`,{token:this.userToken})
  }


  createCita(data){
    data.token=this.userToken;
    return this.http.post(`${this.url}/store`,data)
  }

  getCita(data){
    data.token=this.userToken;
    return this.http.post(`${this.url}/show`,data)
  }

  updateCita(data){
    data.token=this.userToken;  
    return this.http.put(`${this.url}/update/${data.id}`,data)
  }

  deleteCita(data){
    data.token=this.userToken;  
    return this.http.delete(`${this.url}/destroy`,{body:data})
  }

}
