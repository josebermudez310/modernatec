import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoadingController, ModalController, AlertController } from '@ionic/angular';
import { CitasService } from '../../services/citas.service';
import { ModalVerificacionCitaPage } from '../modal-verificacion-cita/modal-verificacion-cita.page';

@Component({
  selector: 'app-verificacion-cita',
  templateUrl: './verificacion-cita.page.html',
  styleUrls: ['./verificacion-cita.page.scss'],
})
export class VerificacionCitaPage implements OnInit {

  formulario: FormGroup

  constructor(
    private fb: FormBuilder,
    private loadingCtr: LoadingController,
    private modalCtr: ModalController,
    private citasService: CitasService,
    private alertCtr: AlertController
  ) { }

  ngOnInit() {
    this.loadForm()
  }
  //funcion para cargar el formulario
  loadForm() {
    this.formulario = this.fb.group({
      //definición de inputs del formulario
      codigo: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[0-9]+')]]
    })
  }

  //funcion para llamar el servicio y verificar la cita
  async verificarCita() {
    //verificar que el formulario sea valido
    if (this.formulario.invalid) {
      return Object.values(this.formulario.controls).forEach(control => {
        control.markAsTouched();
      })
    }
    //Crear componente cargando
    const load = await this.loadingCtr.create(
      {
        message: 'Verificando'
      }
    )
    //Presentar componente cargando
    await load.present();
    //llamamos al servicio
    this.citasService.inforacionCita(this.formulario.value.codigo).subscribe(
      async (res: any) => {
        //reseteamos el formulario
        this.formulario.reset()
        //validamos si ocurre un error
        if (res.message) {
          //creamos la alerta
          const alert = await this.alertCtr.create({ message: "No existe una cita con este codigo", buttons: ['Ok'] });
          //destruimos el loading
          await load.dismiss();
          //presentamos la alerta
          await alert.present();
        } else {
          //si no hay errores creamos el modal
          const modal = await this.modalCtr.create({
            //enviamos el componente que queremos mostrar
            component: ModalVerificacionCitaPage,
            //envimos la informacion necesaria
            componentProps:{
              cita:res
            }
          });
          //destruimos el loading
          await load.dismiss()
          //presentamos el modal
          await modal.present()
        }
      }, async err => {
        //reseteamos el formulario
        this.formulario.reset()
        //creamos la alerta
        const alert = await this.alertCtr.create({ message: "No existe una cita con este codigo", buttons: ['Ok'] });
        //destruimos el loading
        await load.dismiss();
        //presentamos la alerta
        await alert.present();
      }
    )
  }

}
