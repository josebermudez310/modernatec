import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

const bas_url = environment.url_back

@Injectable({
  providedIn: 'root'
})
export class ApiLoginService {

  constructor(private http: HttpClient) { }

  getTopHeadLines(){
    
    // this.http.get('auth/login')

  }
  //* -> Metodo que enviara la info al back
  login(data: {email: string, password: string}) {
     
    const api: string = `${bas_url}/auth/login`
     return this.http.post(api, data)
  }

}
