import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private db:AngularFireDatabase) { }


  storeOrder(order){
   return this.db.list('/orders').push(order)

  }

  getOrders() { 
    return this.db.list('/orders')
     .snapshotChanges().pipe(map(items => {           // <== new way of chaining
      return items.map(a => {
        const data = a.payload.val();
        const key = a.payload.key;
        return {key, data};           // or {key, ...data} in case data is Obj
      });
    }));
  }

  getOrder(orderId){
    return this.db.object('/orders/'+ orderId).snapshotChanges()
  } 

  
  getAllByUser(userId: string){
   
    return this.db.list<any>('/orders', ref => ref.orderByChild('userId').equalTo(userId)).snapshotChanges();
  }
}
