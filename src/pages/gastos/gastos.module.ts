import { EditGastoPage } from './../edit-gasto/edit-gasto';
import { LucrosPage } from './../lucros/lucros';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GastosPage } from './gastos';

@NgModule({
  declarations: [
    LucrosPage,
    GastosPage,
    EditGastoPage
  ],
  imports: [
    IonicPageModule.forChild(GastosPage),
  ],
})
export class GastosPageModule {}
