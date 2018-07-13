import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { EditGastoPage } from './edit-gasto';

@NgModule({
  declarations: [
    EditGastoPage,
  ],
  imports: [
    IonicPageModule.forChild(EditGastoPage),
  ],
})
export class EditGastoPageModule {}
