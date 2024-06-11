import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './auth/guard.service';
import { IceCreamOrderComponent } from './components/ice-cream-order.component';
import { AppComponent } from './app.component';
import { OrderSummaryComponent } from './components/order-summary.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'protected', component: AppComponent, canActivate: [AuthGuard] },
  { path: 'ice-cream-order', component: IceCreamOrderComponent, canActivate: [AuthGuard] },
  { path: 'order-summary', component: OrderSummaryComponent },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
