import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProductService {
  
  constructor(public db:AngularFireDatabase) { }

  create(product){
    this.db.list('/products').push(product)
  }

  getAll(){
     return this.db.list('/products').snapshotChanges().pipe(map(items => {           // <== new way of chaining
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};           // or {key, ...data} in case data is Obj
      });
    }));
  }
  getAllAdmin(){
    return this.db.list('/products').snapshotChanges().pipe(map(items => {           // <== new way of chaining
     return items.map(a => {
       const data = a.payload.val();
       const key = a.payload.key;
       return {key, data};           // or {key, ...data} in case data is Obj
     });
   }));
 }
  
  getProduct(productId){
    return this.db.object('/products/'+ productId).valueChanges()
  } 

  update(productId,product){
   return this.db.object('/products/'+productId).update(product)
  }

  delete(productId){
    return this.db.object('/products/'+ productId).remove()
  }

 
 

}
