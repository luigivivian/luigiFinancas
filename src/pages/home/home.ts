import { LoginPage } from './../login/login';
import { UserListPage } from '../user-list/user-list';
import { Component } from '@angular/core';
import { NavController, App } from 'ionic-angular';
import { CriarContaPage } from '../criar-conta/criar-conta';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public appCtrl: App, public navCtrl: NavController, public storage : Storage) {

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
