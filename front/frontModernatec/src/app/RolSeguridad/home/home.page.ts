import { Component } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { Componente } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  componentes: Observable<Componente[]>;

  constructor(
    //activar el controlador del menu 
    private menuController: MenuController,
    private dataService:DataService
    ) {}

    ngOnInit(){
      //this.componentes= this.dataService.getMenuOpts();
      this.dataService.getMenuOpts().subscribe(
        resp => {
          console.log(resp)
       },
       resp => {
         this.componentes = resp   
         } 
        )
      }   

    //activacion de mostrar el menu
   // mostrarMenu(){
     // this.menuController.open('first')
   // }

}
