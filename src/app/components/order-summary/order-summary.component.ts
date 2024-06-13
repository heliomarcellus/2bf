import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IceCreamOrderService } from 'src/app/services/ice-cream-order.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  order: any;
  selectedPaymentMethod: string = '';

  constructor(private iceCreamOrderService: IceCreamOrderService, private router: Router) { }

  ngOnInit(): void {
    this.fetchLatestOrder();
  }

  fetchLatestOrder(): void {
    this.iceCreamOrderService.getOrders().subscribe(orders => {
      this.order = orders[orders.length - 1];
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    if (this.order) {
      let totalPrice = 0;
      for (const flavor of this.order.flavors) {
        totalPrice += flavor.scoops;
      }
      totalPrice += this.order.cone === 'Casquinha' ? 5 : 4;
      totalPrice *= this.order.quantity;
      this.order.totalPrice = totalPrice.toFixed(2);
    }
  }

  pay(): void {
    if (this.order) {
      this.order.paymentMethod = this.selectedPaymentMethod;
      this.iceCreamOrderService.updateOrder(this.order).subscribe(() => {
        this.router.navigate(['/payment-approval']);
      });
    }
  }
}
