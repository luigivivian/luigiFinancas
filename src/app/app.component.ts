import { LoginPage } from './../pages/login/login';

import { CadastroPage } from './../pages/cadastro/cadastro';
import { Component } from '@angular/core';
import { Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from '@ionic/storage';

import { TabsPage } from '../pages/tabs/tabs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage:any;

  constructor(platform: Platform, statusBar: StatusBar, splashScreen: SplashScreen, private storage: Storage) {
    platform.ready().then(() => {

      storage.get('usuario').then(data =>
        {
          console.log(data);
          if(data == null){
            this.rootPage = LoginPage;
          }else{
            this.rootPage = TabsPage;
          }
        }
      );
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }
}
