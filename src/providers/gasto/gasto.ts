import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

/*
  Generated class for the GastoProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
@Injectable()
export class GastoProvider {

  constructor(public http: HttpClient) {
    console.log('Hello GastoProvider Provider');
  }

}
