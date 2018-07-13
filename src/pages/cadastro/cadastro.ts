import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { NgForm } from '@angular/forms';
import { disableDebugTools } from '@angular/platform-browser';

/**
 * Generated class for the CadastroPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-cadastro',
  templateUrl: 'cadastro.html',
})
export class CadastroPage {
  cadastro : any = {};
  constructor(public navCtrl: NavController, public navParams: NavParams, private storage: Storage)
  {


  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad CadastroPage');
  }

  cadastrar(dados){
    console.log(dados.value.nome)
    this.storage.set('nome', dados.value.nome);
    this.storage.set('sobrenome', dados.value.sobrenome);
    this.getdados();
  }

  getdados(){
    console.log(this.storage.get('nome'));
    console.log(this.storage.get('sobrenome'));
  }
  deluser(){
    this.storage.clear();
  }
}
