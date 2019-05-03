
import { Component, OnInit, OnDestroy } from '@angular/core';


import { Subscription, of, Observable } from 'rxjs';
import { map, switchMap, first } from 'rxjs/operators';
import { AppUser } from '../../models/app-user';
import { AuthService } from '../../services/auth.service';
import { OrderService } from '../../services/order.service';
 
@Component({
  selector: 'my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent implements OnInit{

  orders=[];

  
  
  constructor(
    private authService: AuthService,
    private orderService: OrderService) { 
    
    
 
     authService.user$.pipe(switchMap(user => 
      orderService.getAllByUser(user.uid).pipe(
        map(actions => {
         
          return actions.map(action =>{
            return ({
              datePlaced: action.payload.val().datePlaced,
              items: action.payload.val().items,
              userId: action.payload.val().userId,
              shipping: action.payload.val().shipping,
              
            })
          });
        })
      )
    ))
    .subscribe(orders => console.log(orders));
   
  }
 
  ngOnInit() {
  }
 
 
 
 
  
 
}
 