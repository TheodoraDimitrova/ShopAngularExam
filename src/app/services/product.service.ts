import { Injectable } from '@angular/core';
import { AngularFireDatabase } from '../../../node_modules/angularfire2/database';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(private db:AngularFireDatabase) { }

  create(product){
    this.db.list('/products').push(product)
  }

}
