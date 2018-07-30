
import { TabsPage } from './../tabs/tabs';
import { HomePage } from './../../../../calculadora/src/pages/home/home';
import { CriarContaPage } from './../criar-conta/criar-conta';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Storage } from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
})
export class LoginPage {
  model : User;
  session : Sessao;
  constructor(public navCtrl: NavController, public navParams: NavParams,
    private UsuarioProvider: UsuarioProvider, private toast: ToastController, private storage: Storage) {
      this.model = new User();
      this.model.nome = '';
      this.model.senha = '';
  }

  public entrar(){
    if(this.model.nome == '' || this.model.senha == ''){
      return;
    }
    this.UsuarioProvider.validarDadosLogin(this.model) //verificar se o nome já esta cadastrado
        .then((result : any) =>{
          if(result.error){
            this.toast.create({message: 'Usuario ou Senha incorreto !' , position: 'botton', duration: 3000}).present();
            return;
          }else{

            this.session = new Sessao();
            this.session.id = result.response.id;
            this.session.nome = result.response.nome;
            this.session.senha = result.response.senha

            this.toast.create({message: 'Login aprovado !' , position: 'botton', duration: 3000}).present();
            this.storage.set('usuario', this.session);
            this.navCtrl.push(TabsPage);
          }
    });
  }

  public goToCadastro(){
    this.navCtrl.push(CriarContaPage);
  }

}

export class User{
  nome: string;
  senha: string;
}

export class Sessao{
  id: number;
  nome: string;
  senha: string;
}
