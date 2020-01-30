import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';
import { Componente } from 'src/app/interfaces/interfaces';
import { DataService } from 'src/app/services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit {

  componentes: Observable<Componente[]>

  constructor( private menuCtrl:MenuController,
              private daraService:DataService){}

  ngOnInit(){

    this.componentes = this.daraService.getMenuOpts();
 }

 toggleMenu(){
   this.menuCtrl.toggle();
 }

}
