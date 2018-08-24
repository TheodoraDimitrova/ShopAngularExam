import { Injectable } from "@angular/core";
import { AngularFireDatabase, snapshotChanges } from "../../../node_modules/angularfire2/database";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ShoppingCartService {
  constructor(private db: AngularFireDatabase) {}


  private create() {
    return this.db.list("/shopping-carts").push({
      dateCreate: new Date().getTime()
    });
  }

  getCart(cartId: string) {
    return this.db.object("/shopping-carts/" + cartId).snapshotChanges()
  }

    getOrCreateCart() {
    let cartId = localStorage.getItem("cartId");
    if (cartId) {
      return cartId;
    }else{
      let result =  this.create();
      localStorage.setItem("cartId", result.key);
      return result.key;
    }

  
  }

  async addToCart(product) {
    let cartId = await this.getOrCreateCart();
    let item = this.db.object(
      "/shopping-carts/" + cartId + "/items/" + product.key
    );
    item
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((i:any) => {
        if (i.payload.val()) {
          item.update({
            product: product.payload.val(),
            quantity: i.payload.val().quantity +1 
          });
        } else {
          item.set({
            product: product.payload.val(),
            quantity: 1
          });
        }
      });
  }
}
