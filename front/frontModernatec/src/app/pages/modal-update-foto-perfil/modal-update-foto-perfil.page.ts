import { Component, OnInit, Input } from '@angular/core';
import { StorageService } from '../../services/storage.service';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-update-foto-perfil',
  templateUrl: './modal-update-foto-perfil.page.html',
  styleUrls: ['./modal-update-foto-perfil.page.scss'],
})
export class ModalUpdateFotoPerfilPage implements OnInit {

  img: File;
  preview: any;
  @Input() usuario;
  load: boolean = false;
  perfilChange: boolean = false;
  constructor(
    private modalController:ModalController,
    private storageService: StorageService,
    private loadingCtr: LoadingController,
    private alertCtr: AlertController,
  ) { }

  ngOnInit() {
  }

  agregarImagen(event) {
    const blob:File = event.files[0]
    blob.arrayBuffer().then((res)=>{
      const base64String = btoa(new Uint8Array(res).reduce((data, byte) => data + String.fromCharCode(byte), ''))
      this.preview = `data:image/jpeg;base64,${base64String}`      
    })
  }

  async changePerfilImg() {
    //constante con el controlador de la alerta loading
    const loading = await this.loadingCtr.create({ message: 'cambiando' })
    //presentamos la alerta loading
    await loading.present();
    //llamamos al servicio para cambiar la foto de perfil
    this.storageService.upPerfil(this.img, this.usuario.numero_identificacion).subscribe(
      async (resp) => {
        //creacion de alerta satisfactoria
        const alert = await this.alertCtr.create({
          message: 'Foto de perfil actualizada',
          backdropDismiss: false
        })
        //eliminamos la alerta de loading
        await loading.dismiss();
        //presentamos la alerta satisfactoria
        await alert.present();
        //eliminamos y enviamos a la ruta deseada despues de 2 seg
        setTimeout(async () => {
          await alert.dismiss();
          location.reload();
        }, 2000);
      },
      async (err) => {
        //creacion de alerta en caso de error
        const alert = await this.alertCtr.create({
          message: 'Error al actualizar la foto de perfil',
          buttons: ['ok']
        });
        //eliminamos la alerta de loading
        await loading.dismiss();
        //presentamos la alerta de error
        await alert.present();
      }
    )
  }

  cerrarD(){
    this.modalController.dismiss();
  }

}
