import { Component, OnInit } from "@angular/core";
import { ShoppingCartService } from "../../services/shopping-cart.service";
import { take } from "rxjs/operators";
import { OrderService } from "../../services/order.service";
import { AuthService } from "../../services/auth.service";
import { Subscription } from "rxjs";
import { Router } from '@angular/router';
@Component({
  selector: "app-check-out",
  templateUrl: "./check-out.component.html",
  styleUrls: ["./check-out.component.css"]
})
export class CheckOutComponent implements OnInit {
  shipping = {};
  cart: {};
  items: any;
  userId: string;
  userSubscription: Subscription;
 

  constructor(
    private router: Router,
    private orderService:OrderService,
    private authService:AuthService,
    private shoppingCartService: ShoppingCartService) {}

  ngOnInit() {
    let card = this.shoppingCartService.getCart() 
    .pipe(take(1))
    .subscribe((i: any) => {
      if (i.payload.val()) {
        this.cart = i.payload.val();
        this.items = Object.keys(i.payload.val().items).map(key => ({
          key: key,
          product: i.payload.val().items[key].product,
          quantity:i.payload.val().items[key].quantity
        })   
      );
     
      }
    
    });

    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid)
  }

async  placeOrder() {
    let order = {
      datePlaced: new Date().getTime(),
      userId:this.userId,
      shipping: this.shipping,
      items:this.items
      
    };
    this.shoppingCartService.clearCart()
    let result=await this.orderService.storeOrder(order)
    this.router.navigate(['/order-success', result.key]);
  }

  ngOnDestroy(): void {
    this.userSubscription.unsubscribe()
    
  }
}
