

import { Component, OnInit } from '@angular/core';
import { OrderService } from '../../../services/order.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-orders',
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.css']
})
export class AdminOrdersComponent {
  orders;

 constructor(private orderService: OrderService) { 
  orderService.getOrders().subscribe(orders=>this.orders=orders)

 }
}