import { UsuarioProvider } from './../../providers/usuario/usuario';
import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ToastController } from 'ionic-angular';

/**
 * Generated class for the CriarContaPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-criar-conta',
  templateUrl: 'criar-conta.html',
})
export class CriarContaPage {
  model: User;

  constructor(public navCtrl: NavController, public navParams: NavParams,
    private toast: ToastController, private UsuarioProvider: UsuarioProvider) {
      this.model = new User();
      this.model.nome = '';
      this.model.senha = '';
  }
  
  criarConta(){
    if(this.model.nome == '' || this.model.senha == ''){
      this.toast.create({message: 'Preencha todos os campos !' , position: 'botton', duration: 3000}).present();
      return;
    }
    this.UsuarioProvider.getByNome(this.model) //verificar se o nome já esta cadastrado
    .then((result : any) =>{
      if(result.response){ //cadastrar usuario
        this.UsuarioProvider.criarConta(this.model.nome, this.model.senha) //cadastrando usuario
        .then((result : any) =>{
          this.toast.create({message: 'Usuario cadastrado com sucesso !' , position: 'botton', duration: 3000}).present();
        })
        .catch((error : any) =>{
          this.toast.create({message: 'Erro ao cadastrar Usuario !', position: 'botton', duration: 3000}).present();
        });
      }else if(result.error){ //nao cadastrar Usuario nome já utializado
        this.toast.create({message: 'Nome de Usuario já Utilizado !' , position: 'botton', duration: 3000}).present();
        this.model.nome = '';
        this.model.senha = '';
      }
    });
  }
}

export class User{
  nome: string;
  senha: string;
}
