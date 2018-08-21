import { StatusBar } from '@ionic-native/status-bar';
import { LoginPage } from './../login/login';
import { UserListPage } from '../user-list/user-list';
import { Component, ViewChild } from '@angular/core';
import { NavController, App, ToastController } from 'ionic-angular';
import { CriarContaPage } from '../criar-conta/criar-conta';
import { Storage } from '@ionic/storage';
import { GastoProvider } from '../../providers/gasto/gasto';
import { LucroProvider } from '../../providers/lucro/lucro';
import { getLocaleDayPeriods } from '@angular/common';
import chartJs from 'chart.js';

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
  @ViewChild('pieCanvasLucros') pieCanvasLucros;
  @ViewChild('pieCanvasGastos') pieCanvasGastos;
   
  pieChart: any;
  constructor(public appCtrl: App, public navCtrl: NavController,
     public storage : Storage , private gastoProvider : GastoProvider, private toast: ToastController,
     private lucroProvider : LucroProvider) {
    this.model = new Filtro();
    this.model.ano = this.ano;
    this.model.categoria = 0;
    this.model.mes = -1;
    
  }

  ngAfterViewInit(){
    setTimeout(() => {
      this.pieChart = this.getPieChartLucros();
    }, 150);
    setTimeout(() => {
      this.pieChart = this.getPieChartGastos();
    }, 150);
  }

  ionViewDidEnter(){
    console.log("did Enter");

    this.anos = [];
   
    
    for (let i = this.ano; i <= this.ano + 50; i++) { //setando array com anos
      this.anos.push(i);
    }
    this.getAllDados();
    //carregando graficos
    setTimeout(() => {
      this.pieChart = this.getPieChartLucros();
    }, 150);
    setTimeout(() => {
      this.pieChart = this.getPieChartGastos();
    }, 150);
  }

  getChart(context, chartType, data, options?){
    return new chartJs(context, {
      data,
      options,
      type: chartType,
    })
  }

  getPieChartLucros(){
    var filtro = "";

    var year = this.model.ano;
    var month = "";
    var cat = "";
    if(this.model.mes == -1){ //get tudo
      month = "00";
    }else{
      month = this.model.mes.toString();
    }
    cat = "1"; //categoria ch

    filtro = month+"/"+year+"/0";
    var dinheiro = 0;
    var cartao = 0;
    var cheque = 0;
    this.lucroProvider.getAll(filtro) //get all Lucros por categoria 1
    .then((result: any) =>{
      for (let i = 0; i < result.response.length; i++) {
        if(result.response[i].idCategoria == '1' && result.response[i].recebido == '1'){ //cheque ++
          cheque = cheque + (result.response[i].valorTotal * result.response[i].qtd);
        }else if(result.response[i].idCategoria == '2' && result.response[i].recebido == '1'){ //cartao ++ 
          cartao = cartao + (result.response[i].valorTotal * result.response[i].qtd);
        }else if(result.response[i].idCategoria == '3' && result.response[i].recebido == '1'){ //dinheiro ++
          dinheiro = dinheiro + (result.response[i].valorTotal * result.response[i].qtd);
        }
      }

      var valores = [dinheiro, cartao, cheque];
      const data = {
        labels: ['dinheiro', 'cartao', 'cheque'],
        datasets: [{
          data: valores,
          backgroundColor: ['rgb(3, 181, 0)', 'rgb(8, 0, 255)', 'rgb(255, 174, 0)']
        }]
      }
      return this.getChart(this.pieCanvasLucros.nativeElement, 'pie', data);
    });

  }
  getPieChartGastos(){
    var filtro = "";

    var year = this.model.ano;
    var month = "";
    var cat = "";
    if(this.model.mes == -1){ //get tudo
      month = "00";
    }else{
      month = this.model.mes.toString();
    }
    cat = "1"; //categoria ch

    filtro = month+"/"+year+"/0";
    var dinheiro = 0;
    var cartao = 0;
    var cheque = 0;
    this.gastoProvider.getAll(filtro) //get all gastos por categoria 1
    .then((result: any) =>{
      for (let i = 0; i < result.response.length; i++) {
        if(result.response[i].idCategoria == '1' && result.response[i].pago == '1'){ //cheque ++
          cheque = cheque + (result.response[i].valorTotal * result.response[i].qtd);
        }else if(result.response[i].idCategoria == '2' && result.response[i].pago == '1'){ //cartao ++ 
          cartao = cartao + (result.response[i].valorTotal * result.response[i].qtd);
          console.log("cartao:" +cartao);
        }else if(result.response[i].idCategoria == '3' && result.response[i].pago == '1'){ //dinheiro ++
          dinheiro = dinheiro + (result.response[i].valorTotal * result.response[i].qtd);
        }
      }

      var valores = [dinheiro, cartao, cheque];
      const data = {
        labels: ['dinheiro', 'cartao', 'cheque'],
        datasets: [{
          data: valores,
          backgroundColor: ['rgb(3, 181, 0)', 'rgb(8, 0, 255)', 'rgb(255, 174, 0)']
        }]
      }
      return this.getChart(this.pieCanvasGastos.nativeElement, 'pie', data);
    });

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