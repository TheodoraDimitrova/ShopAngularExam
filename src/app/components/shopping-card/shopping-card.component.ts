import { Component, OnInit } from '@angular/core';
import { ShoppingCartService } from '../../services/shopping-cart.service';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-shopping-card',
  templateUrl: './shopping-card.component.html',
  styleUrls: ['./shopping-card.component.css']
})
export class ShoppingCardComponent implements OnInit {
    cartId:string
    cart$;
  constructor(private shoppingCardService:ShoppingCartService) { }

  ngOnInit() {

      this.cartId=localStorage.getItem("cartId")
    this.shoppingCardService.getCart(this.cartId).subscribe(action => {
      console.log(action.key)
      console.log(action.payload.val())
    });


     
     
  
  }

}
