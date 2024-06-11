import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

interface IceCreamOrder {
  flavors: { flavor: string, scoops: number }[];
}

@Injectable({
  providedIn: 'root'
})
export class IceCreamOrderService {
  private orders: IceCreamOrder[] = [];

  getOrders(): Observable<IceCreamOrder[]> {
    return of(this.orders);
  }

  addOrder(order: IceCreamOrder): void {
    console.log('Adding order:', order);
    this.orders.push(order);
    console.log('Orders after addition:', this.orders);
  }
}
