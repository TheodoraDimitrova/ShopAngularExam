import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../../services/order.service';
import { take } from "rxjs/operators";

@Component({
  selector: 'app-order-details',
  templateUrl: './order-details.component.html',
  styleUrls: ['./order-details.component.css']
})
export class OrderDetailsComponent implements OnInit {
id;
orders:any[]
order:{}
  constructor(private route: ActivatedRoute,private orderService:OrderService) {
    this.id = this.route.snapshot.paramMap.get("id");
    if (this.id)
      this.orderService
        .getOrder(this.id)
        .pipe(take(1))
      .subscribe((i: any) => {
        if (i.payload.val()) {
          this.order = i.payload.val();

          this.orders = Object.keys(i.payload.val().items).map(key => ({
            key: key,
            value: i.payload.val().items[key],
            quantity: i.payload.val().items[key].quantity
          }));
        }
      });
     
        
       
   }

  ngOnInit() {
  }

}
