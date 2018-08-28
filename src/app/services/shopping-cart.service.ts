import { Injectable } from "@angular/core";
import { AngularFireDatabase } from "angularfire2/database";
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
    return this.db.object("/shopping-carts/" + cartId).snapshotChanges();
  }

  async getOrCreateCart() {
    let cartId = localStorage.getItem("cartId");
    if (cartId) {
      return cartId;
    } else {
      let result = this.create();
      localStorage.setItem("cartId", result.key);
      return result.key;
    }
  }

   getItem( productId: string) {
    let cartId = localStorage.getItem("cartId");
    return this.db.object("/shopping-carts/" + cartId + "/items/" + productId);
  }

  async addToCart(product) {
    let cartId = await this.getOrCreateCart();
    let item = this.getItem( product.key);
    item
      .snapshotChanges()
      .pipe(take(1))
      .subscribe((i: any) => {
        if (i.payload.val()) {
          item.update({
            product: product.data,
            quantity: i.payload.val().quantity + 1
          });
        } else {
          item.set({
            product: product.data,
            quantity: 1
          });
        }
      });
  }

  async clearCart() {
    let cartId = await this.getOrCreateCart();
    this.db.object("/shopping-carts/" + cartId + "/items").remove();
  }
}
