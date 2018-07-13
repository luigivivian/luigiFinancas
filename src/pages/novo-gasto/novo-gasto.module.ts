import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { NovoGastoPage } from './novo-gasto';

@NgModule({
  declarations: [
    NovoGastoPage,
  ],
  imports: [
    IonicPageModule.forChild(NovoGastoPage),
  ],
})
export class NovoGastoPageModule {}
