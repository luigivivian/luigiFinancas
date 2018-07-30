import { Http } from '@angular/http';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';

/*
  Generated class for the LucroProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class LucroProvider {

  private API_URL = 'http://192.168.3.150/apiFinancas/api/';


  constructor(public http: Http) {
    
  }

  insert(lucro : any){
    if(lucro.valorTotal == '' || lucro.qtd == ''){
      return;
    }
    return new Promise((resolve, reject) =>{
      
      var data = JSON.stringify({
        valorTotal: lucro.valorTotal,
        qtd: lucro.qtd,
        data: lucro.data,
        descricao: lucro.descricao,
        idCategoria: lucro.idCategoria,
        recebido: lucro.recebido,
        idUsuario: lucro.idUsuario,
       });
       
       console.log(data);
      this.http.post(this.API_URL + 'lucro', data)
        .subscribe((result: any) =>{
          console.log(result);
          resolve(JSON.parse(result.json().response));
      },
      (error) => {
        reject(error);
        console.log(error.json());
      });
    });   
  }

  getAll(filtro : string){
    return new Promise((resolve, reject) =>{
      this.http.get(this.API_URL + 'lucro/'+filtro)
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
      this.http.get(this.API_URL + 'lucro/id/'+id)
        .subscribe((result: any) =>{
          resolve(result.json());
          console.log(result.json().response);
      },
      (error) => {
        reject(error.json());
      });
    });
  }

  update(lucro : any){
    return new Promise((resolve, reject) =>{


      this.http.put(this.API_URL + 'lucro/'+lucro.id, JSON.stringify(lucro))
        .subscribe((result: any) =>{
          console.log(result);
          resolve(result.json());
      },
      (error) => {
        console.log("treta");
        console.log(error.json());
        reject(error.json());

      });
    });
  }
  remove(id : number){
    return new Promise((resolve, reject) =>{
      this.http.delete(this.API_URL + 'lucro/'+ id) //chamando metodo delete api restful
        .subscribe((result: any) =>{
          resolve(result.json());
      },
      (error) => {
        reject(error.json());
      });
    });
  }

}
