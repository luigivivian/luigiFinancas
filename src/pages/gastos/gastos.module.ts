import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { GastosPage } from './gastos';

@NgModule({
  declarations: [
    GastosPage,
  ],
  imports: [
    IonicPageModule.forChild(GastosPage),
  ],
})
export class GastosPageModule {}
