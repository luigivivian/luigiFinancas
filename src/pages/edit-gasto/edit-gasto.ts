import { GastoProvider } from './../../providers/gasto/gasto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the EditGastoPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-gasto',
  templateUrl: 'edit-gasto.html',
})
export class EditGastoPage {
  model: Gasto;

   constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController, private gastoProvider : GastoProvider) {
    if(this.navParams.data.gasto){
      this.model = this.navParams.data.gasto;
      if(this.model.pago == 1){
        this.model.flag = true;
      }else{
        this.model.flag = false;
      }
    }else{
      this.model = new Gasto();
    }

  }

  save(){
    this.saveGasto()
    .then(() =>{
      this.toast.create({message: 'Gasto salvo com sucesso' , position: 'botton', duration: 3000}).present();
      this.navCtrl.pop();
    }).catch((error) => {
      this.toast.create({message: 'Erro ao salvar lucro' , position: 'botton', duration: 3000}).present();
    });
  }

  private saveGasto(){
    if(this.model.id){
      console.log(this.gastoProvider.get(this.model.id));
      if(this.model.flag == true){
        this.model.pago = 1;
      }else{
        this.model.pago = 0;
      }
      return this.gastoProvider.update(this.model);
    }else{
      return this.gastoProvider.insert(this.model);
    }
  }




}

export class Gasto{
  id: number;
  valorTotal: number;
  qtd: number;
  data: string;
  descricao: string;
  idCategoria: number;
  pago: number;
  idUsuario: number;
  flag: boolean;
}
