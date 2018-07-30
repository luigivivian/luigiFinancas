import { GastoProvider } from './../../providers/gasto/gasto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-novo-gasto',
  templateUrl: 'novo-gasto.html',
})
export class NovoGastoPage {
  model: Gasto;
  constructor(public navCtrl: NavController, public navParams: NavParams,
     private GastoProvider : GastoProvider, private toast: ToastController, private storage: Storage) {
    this.model = new Gasto();
    this.model.data = '';
    this.model.descricao = '';
    this.model.idCategoria = null;
    this.model.idUsuario = null;
    this.model.pago = 1;
    this.model.qtd = 1;
    this.model.valorTotal = null;
    storage.get('usuario').then(data =>
      {
        console.log(data);
        if(data != null){
          this.model.idUsuario = data.id;
        }
      }
    );
  }

  novoGasto(){
    this.GastoProvider.insert(this.model).then((result : any) =>{
      this.toast.create({message: 'Gasto cadastrado com sucesso !' , position: 'botton', duration: 3000}).present();
      this.navCtrl.pop();
    })
    .catch((error : any) =>{
      this.toast.create({message: 'Erro ao cadastrar Gasto !', position: 'botton', duration: 3000}).present();
    });

  }


  ionViewDidLoad() {
  }

}

export class Gasto{
  valorTotal: number;
  qtd: number;
  data: string;
  descricao: string;
  idCategoria: number;
  pago: number;
  idUsuario: number;
}
