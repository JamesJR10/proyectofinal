import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PlanesEntrenamientoPage } from './planes-entrenamiento.page';

const routes: Routes = [
  {
    path: '',
    component: PlanesEntrenamientoPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanesEntrenamientoPageRoutingModule {}
