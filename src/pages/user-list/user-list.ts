
import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

@IonicPage()
@Component({
  selector: 'page-user-list',
  templateUrl: 'user-list.html',
})
export class UserListPage {
  users: any[];

  constructor(public navCtrl: NavController, public navParams: NavParams
  ,private toast: ToastController, private usuarioProvider : UsuarioProvider) {
  }

  ionViewDidEnter() {
    this.users = [];
    this.getAllUsers();
  }

  getAllUsers(){
    this.usuarioProvider.getAll()
    .then((result: any) =>{
      for (let i = 0; i < result.response.length; i++) {
        var user = result.response[i];
        this.users.push(user);
      }
    }).catch((error: any) => {
      this.toast.create({message: 'deu zika: '+error , position: 'botton', duration: 3000}).present();
    });
  }
  
  openUser(id : number){
    this.usuarioProvider.get(id).then((result: any) =>{
      this.navCtrl.push('UserInfoPage', { user: result.response });
    }).catch((error: any) => {
      this.toast.create({message: 'deu zika: '+error.error , position: 'botton', duration: 3000}).present();
    });
  }
  openNovoUsuario(){
    this.navCtrl.push('CriarContaPage');
  }

  openUserEdit(id : number){
    this.usuarioProvider.get(id).then((result: any) =>{
      console.log(result.response);
      this.navCtrl.push('UserEditPage', { user: result.response });
    }).catch((error: any) => {
      this.toast.create({message: 'deu zika: '+error.error , position: 'botton', duration: 3000}).present();
    });
  }

  deleteUser(user : any){
    console.log(user);
    this.usuarioProvider.remove(user.id)
    .then((result : any) => {
      let index = this.users.indexOf(user);
      this.users.splice(index, 1);
      this.toast.create({message: 'Usuario Excluido com sucesso ! ', position: 'botton', duration: 3000}).present();
    }).catch((error) =>{
      this.toast.create({message: 'Erro ao excluir Usuario !' , position: 'botton', duration: 3000}).present();
    });
  }
}
