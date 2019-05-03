import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { take } from "rxjs/operators";

@Component({
  selector: "app-shopping-card",
  templateUrl: "./shopping-card.component.html",
  styleUrls: ["./shopping-card.component.css"]
})
export class ShoppingCardComponent implements OnInit {
  cartId: string;
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
 
 
}
