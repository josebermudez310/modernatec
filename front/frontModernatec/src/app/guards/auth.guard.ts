import { Injectable } from '@angular/core';
import {  CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    //importación del servicio
    private authService:AuthService,
    //importación del router
    private router:Router
  ){ }

  canActivate():boolean {   
    //validar que este autenticado
    if(this.authService.autenticar()){
      //retornamos un true si está autenticado
      return true;
    }else{
      //Si no esta autenticado se envia a la pantalla login
      this.router.navigateByUrl('login');
      //retornamos un false si no esta autenticado
      return true;
    }
  }

  
  
}
