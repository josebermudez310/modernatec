import { Component, OnInit } from '@angular/core';

//* -> Importacion del form
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiLoginService } from '../services/api-login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //* -> Implementacion de propiedad del formGroup
  public login_form: FormGroup

  constructor(
    //* -> propiedad privada que dara las propiedades al grup
    private fb : FormBuilder,
    //* -> Inyeccion del servicio 
    private service_api : ApiLoginService,
  ) {
    
    
  }
  
  ngOnInit() {
    this.loadFormLogin()
  }

  //* -> Metodo que armara y cargara el formulario reactivo
  loadFormLogin() {
    this.login_form = this.fb.group({
      //* -> Extructura { propiedad: [ tipo_campo&&valor, [ validadores ] ] }
      email: [ '', [ Validators.required, Validators.email ] ],
      password: [ '', [ Validators.required ] ]

    })
  }

  async validCamps( campo: string ) {
    if (!this.login_form.get(campo).invalid || !this.login_form.get(campo).touched) {


      return false
    }else {

      return true
    }
  }

  //* -> metodo que enviara la peticion
  submitPost() {
    // http://127.0.0.1:8000/api/auth/login
    console.log(this.login_form.value);
    this.service_api.login(this.login_form.value).subscribe(
      resp => {
        console.log(resp);
      }, err => {
        console.log(err);
      }
    )
  }

}
