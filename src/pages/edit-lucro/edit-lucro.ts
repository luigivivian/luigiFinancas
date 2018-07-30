import { LucroProvider } from './../../providers/lucro/lucro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the EditLucroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-edit-lucro',
  templateUrl: 'edit-lucro.html',
})
export class EditLucroPage {
  model: Lucro;

   constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController, private lucroProvider : LucroProvider) {
    if(this.navParams.data.lucro){
      this.model = this.navParams.data.lucro;
      if(this.model.recebido == 1){
        this.model.flag = true;
      }else{
        this.model.flag = false;
      }
    }else{
      this.model = new Lucro();
    }

  }

  save(){
    this.saveLucro()
    .then(() =>{
      this.toast.create({message: 'Lucro salvo com sucesso' , position: 'botton', duration: 3000}).present();
      this.navCtrl.pop();
    }).catch((error) => {
      this.toast.create({message: 'Erro ao salvar lucro' , position: 'botton', duration: 3000}).present();
    });
  }

  private saveLucro(){
    if(this.model.id){
      console.log(this.lucroProvider.get(this.model.id));
      if(this.model.flag == true){
        this.model.recebido = 1;
      }else{
        this.model.recebido = 0;
      }
      return this.lucroProvider.update(this.model);
    }else{
      return this.lucroProvider.insert(this.model);
    }
  }




}

export class Lucro{
  id: number;
  valorTotal: number;
  qtd: number;
  data: string;
  descricao: string;
  idCategoria: number;
  recebido: number;
  idUsuario: number;
  flag: boolean;
}
