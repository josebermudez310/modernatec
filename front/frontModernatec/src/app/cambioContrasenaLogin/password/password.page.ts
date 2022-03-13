import { Component, OnInit } from '@angular/core';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-password',
  templateUrl: './password.page.html',
  styleUrls: ['./password.page.scss'],
})
export class  PasswordPage implements OnInit {

  constructor(
//inyeccion del controlador del alerta

 private alertController: AlertController

  ) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      cssClass: 'my-custom-class',
      header:'MODERNATEC',
      subHeader: 'Atención',
      message: 'En unos segundos usted recibira un codigo al correo para el cambio de contraseña ',
      buttons: ['OK'],
      backdropDismiss:false
    });

    

    await alert.present();
 
  }

}
