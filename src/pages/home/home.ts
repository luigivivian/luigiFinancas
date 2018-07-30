import { LoginPage } from './../login/login';
import { UserListPage } from '../user-list/user-list';
import { Component } from '@angular/core';
import { NavController, App, ToastController } from 'ionic-angular';
import { CriarContaPage } from '../criar-conta/criar-conta';
import { Storage } from '@ionic/storage';
import { GastoProvider } from '../../providers/gasto/gasto';
import { LucroProvider } from '../../providers/lucro/lucro';
import { getLocaleDayPeriods } from '@angular/common';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  gastos: any[];
  lucros: any[];
  model: Filtro;
  ano: any = new Date().getFullYear();
  mes: any = new Date().getMonth();
  anos: number[];
  balanco: number; 
  constructor(public appCtrl: App, public navCtrl: NavController,
     public storage : Storage , private gastoProvider : GastoProvider, private toast: ToastController,
     private lucroProvider : LucroProvider) {
    this.model = new Filtro();
    this.model.ano = this.ano;
    this.model.categoria = 0;
    this.model.mes = -1;
    
  }



  ionViewDidEnter(){
    console.log("did Enter");

    this.anos = [];
    //setando array com anos
    
    for (let i = this.ano; i <= this.ano + 50; i++) {
      this.anos.push(i);
    }
    this.getAllDados();
  }


  getBalanco(){
    var totalGastos = 0;
    var totalLucros = 0;
    for(var i in this.gastos){
      console.log(this.gastos[i]);
      if(this.gastos[i].pago == '1'){
        totalGastos = totalGastos + (this.gastos[i].valorTotal * this.gastos[i].qtd);
      }
    }

    for(var j in this.lucros){
      if(this.lucros[j].recebido == '1'){
        totalLucros = totalLucros + (this.lucros[j].valorTotal * this.lucros[j].qtd);
      }
    }
    console.log("Total Lucros: "+ totalLucros);
    console.log("Total Gastos: "+ totalGastos);
    this.balanco = totalLucros - totalGastos;

    
  }
  getAllDados(){
    this.gastos = [];
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

    filtro = month+"/"+year+"/0";

    this.gastoProvider.getAll(filtro)
    .then((result: any) =>{
      for (let i = 0; i < result.response.length; i++) {
        var gasto = result.response[i];
        this.gastos.push(gasto);
      }

      this.lucroProvider.getAll(filtro)
      .then((result: any) =>{
        for (let i = 0; i < result.response.length; i++) {
          var lucro = result.response[i];
          this.lucros.push(lucro);
        }
        this.getBalanco();
      }).catch((error: any) => {
        this.toast.create({message: 'deu zika: '+error , position: 'botton', duration: 3000}).present();
      });


    }).catch((error: any) => {
      this.toast.create({message: 'deu zika: '+error , position: 'botton', duration: 3000}).present();
    });

    
    

  }

  telaCriarConta(){
    this.navCtrl.push(CriarContaPage);
  }
  telaListUsers(){
    this.navCtrl.push(UserListPage);
  }

  goToLogin(){
    this.navCtrl.push(LoginPage);
  }
  public sair(){
    this.appCtrl.getRootNav().setRoot(LoginPage);
    this.storage.remove('usuario');
  }

}
export class Filtro{
  mes: number;
  ano: number;
  categoria: number;
}