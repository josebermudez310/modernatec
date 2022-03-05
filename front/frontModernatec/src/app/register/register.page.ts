import { Component, OnInit } from '@angular/core';

//* -> Importacion del form
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiRegisterService } from '../services/api-register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  //* -> Implementacion de propiedad del formGroup
  public register_form: FormGroup

  constructor(//* -> propiedad privada que dara las propiedades al grup
    private fb : FormBuilder,
    //* -> Inyeccion del servicio 
    private service_api : ApiRegisterService,) { }

  ngOnInit() {
    this.loadFormRegister()
  }

  
  //* -> Metodo que armara y cargara el formulario reactivo
  loadFormRegister() {
    this.register_form = this.fb.group({
      //* -> Extructura { propiedad: [ tipo_campo&&valor, [ validadores ] ] }
      name: [ '', [ Validators.required ] ],
      apellidos: [ '', [ Validators.required ] ],
      telefono: [ '', [ Validators.required ] ],
      email : [ '', [ Validators.required,Validators.email ] ],
      numero_identificacion: [ '', [ Validators.required] ]



    })
  }

  validCamps( campo: string ) {
    if (!this.register_form.get(campo).invalid || !this.register_form.get(campo).touched) {


      return false
    }else {

      return true
    }
  }

  //* -> metodo que enviara la peticion
  submitPost() {
    // http://127.0.0.1:8000/api/auth/Register
    
    console.log(this.register_form.value);
    this.service_api.register(this.register_form.value).subscribe(
      resp => {
        
        //let leaddetails = resp.json();

        //let leaddetails =JSON.stringify(resp.message);

      //  console.log(leaddetails.senderNewCall);

        //console.log(leaddetails);

        console.log(resp);

      }, err => {
        
        
        console.log(err);
      }
    )
  }

}
