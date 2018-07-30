import { EditGastoPage } from './../edit-gasto/edit-gasto';
import { GastoProvider } from './../../providers/gasto/gasto';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { NovoLucroPage } from '../novo-lucro/novo-lucro';
import { NovoGastoPage } from '../novo-gasto/novo-gasto';

@IonicPage()
@Component({
  selector: 'page-gastos',
  templateUrl: 'gastos.html',
})
export class GastosPage {
  gastos: any[];
  model: Filtro;
  ano: any = new Date().getFullYear();
  mes: any = new Date().getMonth();
  anos: number[]; 
  categoria: string;
  constructor(public navCtrl: NavController, public navParams: NavParams
    ,private toast: ToastController, private gastoProvider : GastoProvider) {

      this.model = new Filtro();
      this.model.ano = this.ano;
      this.model.categoria = 0;
      this.model.mes = -1;
      

    }

  ionViewDidEnter() {
    
    this.gastos = [];
    this.anos = [];
    //setando array com anos
    
    for (let i = this.ano; i <= this.ano + 50; i++) {
      this.anos.push(i);
    }
    this.getAllGastos();
    
  }

  getAllGastos(){
    this.gastos = [];
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
    this.gastoProvider.getAll(filtro)
    .then((result: any) =>{
      for (let i = 0; i < result.response.length; i++) {
        var gasto = result.response[i];
        var loc = "assets/imgs/"+gasto.idCategoria+".png";
        gasto.icone = loc;
        this.gastos.push(gasto);
      }
    }).catch((error: any) => {
      this.toast.create({message: 'deu zika: '+error , position: 'botton', duration: 3000}).present();
    });
  }
  openGasto(id : number){
    this.gastoProvider.get(id).then((result: any) =>{
      this.navCtrl.push('EditGastoPage', { gasto: result.response });
    }).catch((error: any) => {
      this.toast.create({message: 'deu zika: '+error.error , position: 'botton', duration: 3000}).present();
    });
  }

  deleteGasto(gasto : any){
    console.log(gasto);
    this.gastoProvider.remove(gasto.id)
    .then((result : any) => {
      let index = this.gastos.indexOf(gasto);
      this.gastos.splice(index, 1);
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