import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface IceCreamOrder {
  flavors: { flavor: string, scoops: number }[];
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
    console.log('Orders after addition:', this.orders);

    // Envie o pedido para o mock
    this.sendOrderToMock(order);

    // Envie o pedido para o endpoint desejado
    return this.sendOrderToEndpoint(order);
  }

  private sendOrderToMock(order: IceCreamOrder): void {
    console.log('Sending order to mock:', order);
    // Simula o envio do pedido para o mock armazenando-o no armazenamento local
    const mockOrders = JSON.parse(localStorage.getItem('mockOrders') || '[]');
    mockOrders.push(order);
    localStorage.setItem('mockOrders', JSON.stringify(mockOrders));
    console.log('Order sent to mock:', order);
  }

  private sendOrderToEndpoint(order: IceCreamOrder): Observable<any> {
    console.log('Sending order to endpoint:', order);
    return this.http.post<any>(this.apiUrl, order);
  }
}
