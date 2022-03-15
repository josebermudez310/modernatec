import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { StatusBarInfo } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';
import { Componente } from './interfaces/interfaces';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit {

  componentes: Componente[];

  constructor(
    private platform: Platform,
    private dataService:DataService,
    public router:Router
  ) {
    this.initializeApp();
  }

  ngOnInit(): void {
    //this.componentes= this.dataService.getMenuOpts();
    this.dataService.getMenuOpts().subscribe(
      resp => {
        console.log(resp);
        
        this. componentes = resp
      })    
  }

  initializeApp(){
    this.platform.ready().then(()=>{  
      this.router.navigateByUrl('splash');
    });
  }
}
