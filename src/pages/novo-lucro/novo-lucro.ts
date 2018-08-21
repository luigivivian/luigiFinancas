import { LucroProvider } from './../../providers/lucro/lucro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';

/**
 * Generated class for the NovoLucroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-novo-lucro',
  templateUrl: 'novo-lucro.html',
})
export class NovoLucroPage {
  model: Lucro;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private LucroProvider : LucroProvider, private toast: ToastController, private storage: Storage) {
    this.model = new Lucro();
    this.model.valorTotal = null;
    this.model.qtd = null;
    this.model.data = '';
    this.model.descricao = '';
    this.model.idCategoria = null;
    this.model.recebido = 1;
    this.model.idUsuario = 1;
    storage.get('usuario').then(data =>
      {
        console.log(data);
        if(data != null){
          this.model.idUsuario = data.id;
        }
      }
    );
  }

  novoLucro(){
    this.LucroProvider.insert(this.model).then((result : any) =>{
      this.toast.create({message: 'Lucro cadastrado com sucesso !' , position: 'botton', duration: 3000}).present();
      this.navCtrl.pop();
    })
    .catch((error : any) =>{
      this.toast.create({message: 'Erro ao cadastrar Lucro !', position: 'botton', duration: 3000}).present();
    });

  }

  ionViewDidLoad() {

  }

}

export class Lucro{
  valorTotal: number;
  qtd: number;
  data: string;
  descricao: string;
  idCategoria: number;
  recebido: number;
  idUsuario: number;
}
