import { NovoGastoPage } from './../novo-gasto/novo-gasto';
import { EditLucroPage } from './../edit-lucro/edit-lucro';
import { NovoLucroPage } from './../novo-lucro/novo-lucro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { LucroProvider } from '../../providers/lucro/lucro';

/**
 * Generated class for the LucrosPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-lucros',
  templateUrl: 'lucros.html',
})
export class LucrosPage {
  lucros: any[];
  model: Filtro;
  ano: any = new Date().getFullYear();
  mes: any = new Date().getMonth();
  anos: number[];
  constructor(public navCtrl: NavController, public navParams: NavParams
  ,private toast: ToastController, private lucroProvider : LucroProvider) {
    
    this.model = new Filtro();
    this.model.ano = this.ano;
    this.model.categoria = 0;
    this.model.mes = -1;
  }


  ionViewDidEnter() {
    
    this.lucros = [];
    this.anos = [];
    //setando array com anos
    
    for (let i = this.ano; i <= this.ano + 50; i++) {
      this.anos.push(i);
    }
    this.getAllLucros();
    

  }


  getAllLucros(){
    this.lucros = [];
    var filtro = "";

    var year = this.model.ano;
    var month = "";
    var cat = "";

    if(this.model.mes == -1){ //get tudo
      month = "00";
    }else{
      month = this.model.mes.toString();
    }

    if(this.model.categoria != 0){
      cat = this.model.categoria.toString();
    }else{
      cat = "0";
    }

    filtro = month+"/"+year+"/"+cat;


    this.lucroProvider.getAll(filtro)
    .then((result: any) =>{
      for (let i = 0; i < result.response.length; i++) {
        var lucro = result.response[i];
        var loc = "assets/imgs/"+lucro.idCategoria+".png";
        lucro.icone = loc;
        this.lucros.push(lucro);
      }
    }).catch((error: any) => {
      this.toast.create({message: 'deu zika: '+error , position: 'botton', duration: 3000}).present();
    });
  }
  openLucro(id : number){
    this.lucroProvider.get(id).then((result: any) =>{
      this.navCtrl.push('EditLucroPage', { lucro: result.response });
    }).catch((error: any) => {
      this.toast.create({message: 'deu zika: '+error.error , position: 'botton', duration: 3000}).present();
    });
  }

  deleteLucro(lucro : any){
    console.log(lucro);
    this.lucroProvider.remove(lucro.id)
    .then((result : any) => {
      let index = this.lucros.indexOf(lucro);
      this.lucros.splice(index, 1);
      this.toast.create({message: 'Lucro Excluido com sucesso ! ', position: 'botton', duration: 3000}).present();
    }).catch((error) =>{
      this.toast.create({message: 'Erro ao excluir Lucro !' , position: 'botton', duration: 3000}).present();
    });
  }

  
  goToNovoLucro(){
    this.navCtrl.push(NovoLucroPage);
  }
  
  goToNovoGasto(){
    this.navCtrl.push(NovoGastoPage);
  }

}

export class Filtro{
  mes: number;
  ano: number;
  categoria: number;
}