import { GastosPage } from './../gastos/gastos';
import { EditLucroPage } from './../edit-lucro/edit-lucro';
import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { LucrosPage } from './lucros';

@NgModule({
  declarations: [
    LucrosPage,
    GastosPage,
    EditLucroPage
  ],
  imports: [
    IonicPageModule.forChild(LucrosPage),
  ],
})
export class LucrosPageModule {}
