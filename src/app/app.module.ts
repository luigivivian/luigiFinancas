

import { HttpModule } from '@angular/http';

import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { IonicStorageModule } from '@ionic/storage';
// PAGES
import { AboutPage } from '../pages/about/about';
import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { EditLucroPage } from '../pages/edit-lucro/edit-lucro';
import { EditGastoPage } from '../pages/edit-gasto/edit-gasto';
import { LoginPage } from '../pages/login/login';
import { CriarContaPage } from '../pages/criar-conta/criar-conta';
import { CadastroPage } from '../pages/cadastro/cadastro';
import { UserListPage } from '../pages/user-list/user-list';
import { NovoLucroPage } from '../pages/novo-lucro/novo-lucro';
import { NovoGastoPage } from '../pages/novo-gasto/novo-gasto';
import { GastosPage } from '../pages/gastos/gastos';
import { LucrosPage } from '../pages/lucros/lucros';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DatePipe } from '@angular/common';

// Providers

import { UsuarioProvider } from '../providers/usuario/usuario';
import { LucroProvider } from '../providers/lucro/lucro';
import { GastoProvider } from '../providers/gasto/gasto';



@NgModule({
  declarations: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    CadastroPage,
    CriarContaPage,
    UserListPage,
    LoginPage,
    NovoLucroPage,
    NovoGastoPage,
    LucrosPage,
    GastosPage

  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    HttpModule,
    IonicStorageModule.forRoot()
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    AboutPage,
    HomePage,
    TabsPage,
    CadastroPage,
    CriarContaPage,
    UserListPage,
    LoginPage,
    NovoLucroPage,
    NovoGastoPage,
    LucrosPage,
    GastosPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    DatePipe,
    UsuarioProvider,
    LucroProvider,
    GastoProvider
  ]
})
export class AppModule {}
