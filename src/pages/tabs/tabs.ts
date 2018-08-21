
import { Component } from '@angular/core';

import { AboutPage } from '../about/about';
import { HomePage } from '../home/home';
import { CriarContaPage } from '../criar-conta/criar-conta';
import { LucrosPage } from '../lucros/lucros';
import { GastosPage } from '../gastos/gastos';
import { Storage } from '@ionic/storage';
import { LoginPage } from '../login/login';
import { NavController, NavParams, App } from 'ionic-angular';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = LucrosPage;
  tab3Root = GastosPage;
  tab4Root = LoginPage;

  constructor(public navCtrl: NavController, public appCtrl: App, public navParams: NavParams, private storage: Storage) {

  }


}
