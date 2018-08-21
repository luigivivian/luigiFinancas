import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-info',
  templateUrl: 'user-info.html',
})
export class UserInfoPage {
  user : any;
  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.user = this.navParams.data.user;
  }


}
