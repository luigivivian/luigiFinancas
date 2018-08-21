import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CriarContaPage } from './criar-conta';

@NgModule({
  declarations: [
    CriarContaPage,
  ],
  imports: [
    IonicPageModule.forChild(CriarContaPage),
  ],
})
export class CriarContaPageModule {}
