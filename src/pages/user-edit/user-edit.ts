import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';
@IonicPage()
@Component({
  selector: 'page-user-edit',
  templateUrl: 'user-edit.html',
})
export class UserEditPage {
  model: User;
  constructor(public navCtrl: NavController, public navParams: NavParams,
              private toast: ToastController, private usuarioProvider : UsuarioProvider) {
    if(this.navParams.data.user){
      this.model = this.navParams.data.user;
    }else{
      this.model = new User();
    }

  }

  save(){
    this.saveUser()
    .then(() =>{
      this.toast.create({message: 'Usuario salvo com sucesso' , position: 'botton', duration: 3000}).present();
      this.navCtrl.pop();
    }).catch((error) => {
      this.toast.create({message: 'Erro ao salvar usuario' , position: 'botton', duration: 3000}).present();
    });
  }

  private saveUser(){
    if(this.model.id){

      console.log(this.usuarioProvider.get(this.model.id));
      return this.usuarioProvider.update(this.model);

    }else{
      return this.usuarioProvider.insert(this.model);
    }
  }



}

export class User{
  id: number;
  nome: string;
  senha: string;
}