import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { IceCreamOrderService } from '../services/ice-cream-order.service';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {

  constructor(private iceCreamOrderService: IceCreamOrderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (req.url.endsWith('/auth/login') && req.method === 'POST') {
      const { login, password } = req.body;
      if (login === 'user' && password === 'password') {
        return of(new HttpResponse({ status: 200, body: { token: 'mock-token' } })).pipe(delay(500));
      } else {
        return of(new HttpResponse({ status: 403, body: { message: 'Invalid login' } })).pipe(delay(500));
      }
    }

    if (req.url.endsWith('/orders') && req.method === 'POST') {
      const order = req.body.order; // Ajuste para acessar o pedido real
      this.iceCreamOrderService.addOrder(order);
      console.log('Pedido feito com sucesso!');
      return of(new HttpResponse({ status: 200, body: { message: 'Order placed successfully' } })).pipe(delay(500));
    }

    return next.handle(req);
  }
}
