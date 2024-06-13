import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IceCreamOrderService } from 'src/app/services/ice-cream-order.service';

@Component({
  selector: 'app-payment-approval',
  templateUrl: './payment-approval.component.html',
  styleUrls: ['./payment-approval.component.scss']
})
export class PaymentApprovalComponent implements OnInit {
  order: any;

  constructor(
    private iceCreamOrderService: IceCreamOrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.fetchLatestOrder();
  }

  fetchLatestOrder(): void {
    this.iceCreamOrderService.getOrders().subscribe(orders => {
      this.order = orders[orders.length - 1];
    });
  }

  backToHome(): void {
    this.router.navigate(['/ice-cream-order']);
  }
}
