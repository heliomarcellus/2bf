import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { AuthGuard } from './auth/guard.service';
import { IceCreamOrderComponent } from './components/ice-cream-order/ice-cream-order.component';
import { OrderSummaryComponent } from './components/order-summary/order-summary.component';
import { PaymentApprovalComponent } from './components/payment-approval/payment-approval.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'ice-cream-order', component: IceCreamOrderComponent, canActivate: [AuthGuard] },
  { path: 'order-summary', component: OrderSummaryComponent, canActivate: [AuthGuard] },
  { path: 'payment-approval', component: PaymentApprovalComponent, canActivate: [AuthGuard] },
  { path: '', redirectTo: 'login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
