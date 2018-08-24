import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private db:AngularFireDatabase) { }
  create(){
    return this.db.list('/shopping-carts').push({
      dateCreate:new Date().getTime()
    })
  }

}
