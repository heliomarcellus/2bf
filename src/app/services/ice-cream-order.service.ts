import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface IceCreamOrder {
  id?: any;
  flavors: { flavor: string, scoops: number }[];
  quantity: number;
  cone: string;
  totalPrice?: number;
  paymentMethod?: string;
}

@Injectable({
  providedIn: 'root'
})
export class IceCreamOrderService {
  private orders: IceCreamOrder[] = [];
  private apiUrl = 'http://177.140.220.91:8081/v3/api-docs';

  constructor(private http: HttpClient) { }

  getOrders(): Observable<IceCreamOrder[]> {
    return of(this.orders);
  }

  addOrder(order: IceCreamOrder): Observable<any> {
    console.log('Adding order:', order);
    this.orders.push(order);
    return of(order); // Simulação de resposta do servidor
  }

  updateOrder(order: IceCreamOrder): Observable<any> {
    const index = this.orders.findIndex(o => o.id === order.id);
    if (index !== -1) {
      this.orders[index] = order;
      console.log('Updating order:', order);
      return of(order); // Simulação de resposta do servidor
    } else {
      this.orders.push(order); // Adiciona o pedido se não encontrado
      console.log('Adding order since not found during update:', order);
      return of(order); // Simulação de resposta do servidor
    }
  }
}
