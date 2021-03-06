import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { map } from "rxjs/operators";
import { take } from "rxjs/operators";

@Component({
  selector: "app-shopping-card",
  templateUrl: "./shopping-card.component.html",
  styleUrls: ["./shopping-card.component.css"]
})
export class ShoppingCardComponent implements OnInit {
  cartId: string;
  cart: {};
  items: any[];
 

  constructor(private shoppingCardService: ShoppingCartService) {}

  ngOnInit() {
    this.shoppingCardService
    .getCart()
    .pipe(take(1))
    .subscribe((i: any) => {
      if (i.payload.val()) {
        this.cart = i.payload.val();
        this.items = Object.keys(i.payload.val().items).map(key => ({
          key: key,
          value: i.payload.val().items[key],
          quantity: i.payload.val().items[key].quantity
        }));
      }
    });
  }

  clearCart() {
    this.cart = {};
    this.items=[]
    this.shoppingCardService.clearCart();
  }

 addToCart(product) {
   console.log(product)
  
 
  }

  removeFromCart(product) {
  console.log(product)
   
  }
 
}
