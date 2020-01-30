import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlanesEntrenamientoPageRoutingModule } from './planes-entrenamiento-routing.module';

import { PlanesEntrenamientoPage } from './planes-entrenamiento.page';
import { ComponentsModule } from 'src/app/components/components.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PlanesEntrenamientoPageRoutingModule,
    ComponentsModule
  ],
  declarations: [PlanesEntrenamientoPage]
})
export class PlanesEntrenamientoPageModule {}
