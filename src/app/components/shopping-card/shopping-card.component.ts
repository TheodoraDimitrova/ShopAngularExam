import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from "../../services/shopping-cart.service";
<<<<<<< HEAD
=======
import { map } from "rxjs/operators";
>>>>>>> af2c9e3b195a5f164b9264b3b23f9a6e7ba416ad
import { take } from "rxjs/operators";

@Component({
  selector: "app-shopping-card",
  templateUrl: "./shopping-card.component.html",
  styleUrls: ["./shopping-card.component.css"]
})
export class ShoppingCardComponent implements OnInit {
  cartId: string;
<<<<<<< HEAD
  cart:{};
  items: any[];
  constructor(private shoppingCardService: ShoppingCartService) {}

  ngOnInit() {
    this.cartId = localStorage.getItem("cartId");
     this.shoppingCardService
      .getCart(this.cartId)
      .pipe(take(1))
      .subscribe((i: any) => {
        if( i.payload.val()){
          this.cart = i.payload.val();
           console.log(this.cart)
          this.items = Object.keys(i.payload.val().items).map(key => ({
            key: key,
            value: i.payload.val().items[key]
          }));
        }
        
      });
  }

  clearCart() {
    this.shoppingCardService.clearCart();
    this.cart={}
  }
 
=======
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
>>>>>>> af2c9e3b195a5f164b9264b3b23f9a6e7ba416ad
 
}
