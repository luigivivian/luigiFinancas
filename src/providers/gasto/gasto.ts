
import { Injectable } from '@angular/core';
import { Http } from '@angular/http';

/*
  Generated class for the GastoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GastoProvider {
  private API_URL = 'http://177.67.253.148/~iconoteca/ApiFinancas/api/';

  constructor(public http: Http) {

  }

  insert(gasto : any){
    if(gasto.valorTotal == '' || gasto.qtd == ''){
      return;
    }
    return new Promise((resolve, reject) =>{
      
      var data = JSON.stringify({
        valorTotal: gasto.valorTotal,
        qtd: gasto.qtd,
        data: gasto.data,
        descricao: gasto.descricao,
        idCategoria: gasto.idCategoria,
        pago: gasto.pago,
        idUsuario: gasto.idUsuario,
       });
       
      this.http.post(this.API_URL + 'gasto', data)
        .subscribe((result: any) =>{
          console.log(result);
          resolve(JSON.parse(result.json().response));
      },
      (error) => {
        console.log(error.json());
        reject(error);
      });
    });   
  }

  getAll(filtro : string){

    return new Promise((resolve, reject) =>{
      this.http.get(this.API_URL + 'gasto/'+filtro)
        .subscribe((result: any) =>{
          console.log(result.json());
          resolve(result.json());
      },
      (error) => {
        console.log(error.json());
        reject(error.json());
      });
    });
  }

  get(id: number){
    return new Promise((resolve, reject) =>{
      this.http.get(this.API_URL + 'gasto/id/'+id)
        .subscribe((result: any) =>{
          resolve(result.json());
          console.log(result.json().response);
      },
      (error) => {
        reject(error.json());
      });
    });
  }

  update(gasto : any){
    return new Promise((resolve, reject) =>{
      this.http.put(this.API_URL + 'gasto/'+gasto.id, JSON.stringify(gasto))
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
      this.http.delete(this.API_URL + 'gasto/'+ id) //chamando metodo delete api restful
        .subscribe((result: any) =>{
          resolve(result.json());
      },
      (error) => {
        reject(error.json());
      });
    });
  }
}
