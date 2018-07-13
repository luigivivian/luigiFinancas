import { NovoLucroPage } from './../novo-lucro/novo-lucro';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

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

  constructor(public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad LucrosPage');
  }

  goToNovoLucro(){
    this.navCtrl.push(NovoLucroPage);
  }

}
