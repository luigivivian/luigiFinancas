import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';


import 'rxjs/add/operator/map';

@Injectable()
export class UsuarioProvider {

  private API_URL = 'http://177.67.253.148/~iconoteca/ApiFinancas/api/';

  constructor(public http: Http) {

  }

  criarConta(nome: string, senha: string){
      return new Promise((resolve, reject) =>{
        var data = JSON.stringify({
            nome: nome,
            senha: senha
        });
        console.log(data);
        this.http.post(this.API_URL + 'usuario', data)
          .subscribe((result: any) =>{
            resolve(JSON.parse(result.json().response));
        },
        (error) => {
          reject(error);
          console.log(error.json());
        });
      });   
  }
  login(nome: string, senha: string){
    return new Promise((resolve, reject) =>{
      var data = {
          nome: nome,
          senha: senha
      };
      this.http.post(this.API_URL + 'usuario/login/'+nome+'/'+senha, data)
        .subscribe((result: any) =>{
          resolve(result.json());
      },
      (error) => {
        reject(error.json());
      });

    });
  }

  getAll(){
    return new Promise((resolve, reject) =>{
      this.http.get(this.API_URL + 'usuario')
        .subscribe((result: any) =>{
          resolve(result.json());
      },
      (error) => {
        reject(error.json());
      });
    });
  }
  get(id: number){
    return new Promise((resolve, reject) =>{
      this.http.get(this.API_URL + 'usuario/id/'+id)
        .subscribe((result: any) =>{
          resolve(result.json());
          console.log(result.json().response);
      },
      (error) => {
        reject(error.json());
      });
    });
  }
  getByNome(user : any){
    return new Promise((resolve, reject) =>{
      var data = JSON.stringify({
          nome: user.nome,
          senha: user.senha
      });
      this.http.post(this.API_URL + 'usuario/nome', data)
        .subscribe((result: any) =>{
          console.log(result.json());
          resolve(result.json());
      }
      );
    });
  }
  validarDadosLogin(user : any){
    return new Promise((resolve, reject) =>{
      var data = JSON.stringify({
          nome: user.nome,
          senha: user.senha
      });
      this.http.post(this.API_URL + 'usuario/logar', data)
        .subscribe((result: any) =>{
          resolve(result.json());
      });
    });
  }
  insert(usuario : any){
    return new Promise((resolve, reject) =>{
      this.http.post(this.API_URL + 'usuario', usuario)
        .subscribe((result: any) =>{
          resolve(result.json());
      },
      (error) => {
        reject(error.json());
      });
    });
  }
  update(usuario : any){
    return new Promise((resolve, reject) =>{
      var data = {
        id: usuario.id,
        nome: usuario.nome,
        senha: usuario.senha
    };

      this.http.put(this.API_URL + 'usuario/'+usuario.id, JSON.stringify(data))
        .subscribe((result: any) =>{
          resolve(result.json());
      },
      (error) => {
        reject(error.json());
        console.log("treta");
        console.log(error.json());
      });
    });
  }
  remove(id : number){
    return new Promise((resolve, reject) =>{
      var data = {
        id: id
    };
      this.http.delete(this.API_URL + 'usuario/'+id) //chamando metodo delete api restful
        .subscribe((result: any) =>{
          resolve(result.json());
      },
      (error) => {
        reject(error.json());
      });
    });
  }

}
