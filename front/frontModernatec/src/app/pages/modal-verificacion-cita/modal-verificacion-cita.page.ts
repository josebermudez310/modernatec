import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-modal-verificacion-cita',
  templateUrl: './modal-verificacion-cita.page.html',
  styleUrls: ['./modal-verificacion-cita.page.scss'],
})
export class ModalVerificacionCitaPage implements OnInit {
  @Input()cita;
  constructor(
    private modalCtr:ModalController
  ) { }

  ngOnInit() {
    console.log(this.cita);
    
  }
  close(){
    this.modalCtr.dismiss();
  }
}
