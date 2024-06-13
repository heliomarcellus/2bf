import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { IceCreamOrderService } from './services/ice-cream-order.service';
import { AppRoutingModule } from './app-routing.module';
import { MockBackendInterceptor } from './auth/mock-backend.interceptor';
import { LoginComponent } from './components/login/login.component';
import { IceCreamOrderComponent } from './components/ice-cream-order/ice-cream-order.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';

@NgModule({
  declarations: [
    AppComponent,
    IceCreamOrderComponent,
    LoginComponent,
    OrderSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  providers: [
    IceCreamOrderService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MockBackendInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }