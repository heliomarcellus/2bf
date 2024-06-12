import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, delay } from 'rxjs/operators';
import { IceCreamOrderService } from '../services/ice-cream-order.service';

@Injectable()
export class MockBackendInterceptor implements HttpInterceptor {

  constructor(private iceCreamOrderService: IceCreamOrderService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Interceptor ativado!');

    if (req.url === 'http://177.140.220.91:8081/v3/api-docs' && req.method === 'POST') {
      const order = req.body; 
      this.iceCreamOrderService.addOrder(order);
      console.log('Pedido feito com sucesso!');
      return of(new HttpResponse({ status: 200, body: { message: 'Order placed successfully' } })).pipe(delay(500));
    }

    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Erro na solicitação:', error);
        return throwError(error);
      })
    );
  }
}
