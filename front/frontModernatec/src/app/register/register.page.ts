import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Router } from '@angular/router';

//* -> Importacion del form
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiRegisterService } from '../services/api-register.service';
import { RegisterRespose } from '../interfaces/respuestaRegistro';






@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  protected alerta:HTMLIonAlertElement;
  //* -> Implementacion de propiedad del formGroup
  public register_form: FormGroup


  constructor(//* -> propiedad privada que dara las propiedades al grup
    private fb : FormBuilder,
    //* -> Inyeccion del servicio 
    private service_api : ApiRegisterService,
      // impotación del controlador de alertas
      private alertController: AlertController,
      //importación del controlador de loading
      public loadingController: LoadingController,
      //importacion del router
      private router:Router,
    
    ) { }

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

  //* -> metodo que generara un 

  async submitPost() {
    if (this.register_form.invalid){
      return Object.values(this.register_form.controls).forEach(control=>{
        control.markAsTouched();
      })
    }
    const loading = await this.loadingController.create({
      cssClass: 'my-custom-class',
      message: 'Guardando Datos'
    });
    await loading.present();
  }
    // http://127.0.0.1:8000/api/auth/Register


    
  //   console.log(this.register_form.value);
  //   this.service_api.register(this.register_form.value).subscribe(
  //     (resp: RegisterRespose) => {
  //       //resp.message

  //       console.log("message",resp.message);
  //       console.log("Nombre:",resp.user.name );

  //       //TODO: Crear alerta
  //        async alert() {
  //         const alert = await this.alertController.create({
  //           cssClass: 'alertaRegister',
  //           header: 'BIENVENIDO'+ resp.user.name,
           
  //          message: resp.message,
            
  //        });
      
  //       await alert.alert();
    
  //    alert(resp.message + ' BIENVENIDO : ' + resp.user.name  );

  //     }, err => {
        
        
  //       console.log(err);
  //     }
  //   )
  // }

}
