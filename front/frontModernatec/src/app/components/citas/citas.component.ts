import { Component, OnDestroy, OnInit } from '@angular/core';
import { CitasService } from '../../services/citas.service';
import { UsuariosService } from '../../services/usuarios.service';

@Component({
  selector: 'app-citas',
  templateUrl: './citas.component.html',
  styleUrls: ['./citas.component.scss'],
})
export class CitasComponent implements OnInit {

  allCitas: any[] = [];
  dayCitas: any[] = [];
  date = new Date();
  buscado=false;
  constructor(
    private citasService: CitasService,
    private userService: UsuariosService
  ) {
    this.allCitas = [];
    this.dayCitas = [];

  }

 

  ngOnInit() {

    this.citasService.getCitas().subscribe(
      (resp: any) => {
        this.allCitas = resp;
        this.allCitas.map(
          cita => {
            const fecha = new Date(cita.fecha);
            const real = this.addDaysToDate(fecha, 1);
            if (this.date.toLocaleDateString() == real.toLocaleDateString()) {
              this.dayCitas.push(cita);

            }
          }
        )

      }
    )
  }

 

  cambioFecha(event) {
    this.date = new Date(event.detail.value);
    this.dayCitas = [];
    this.allCitas.map(
      cita => {

        const fecha = new Date(cita.fecha);


        const real = this.addDaysToDate(fecha, 1);


        if (this.date.toLocaleDateString() == real.toLocaleDateString()) {
          this.dayCitas.push(cita);
        }
      }
    )
  }
  addDaysToDate(date, days) {
    var res = new Date(date);
    res.setDate(res.getDate() + days);
    return res;
  }

  
}
