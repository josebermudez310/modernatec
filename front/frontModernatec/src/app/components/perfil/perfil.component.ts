import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { StorageService } from '../../services/storage.service';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';


@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
})
export class PerfilComponent implements OnInit {

  img:File;
  preview:any;
  usuario:any;
  load:boolean=false;
  perfilChange:boolean=false;
  constructor(
    private authService:AuthService
  ) {
    
  }

  

  ngOnInit() {
    
    this.authService.perfil().subscribe(
      res=>{        
        this.usuario=res;
        this.load=true;
      }
    )
  }

  imagen(){
    const imagen: string = this.usuario.url_perfil;
    if (imagen) {
      return 'https://'+imagen;
    }else{
      return './assets/icon/perfil.jpg';
    }
  }

 
  
  


}
