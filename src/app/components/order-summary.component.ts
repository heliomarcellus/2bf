import { Component, OnInit } from '@angular/core';
import { IceCreamOrderService } from '../services/ice-cream-order.service';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  order: any;
  selectedPaymentMethod: string = '';

  constructor(private iceCreamOrderService: IceCreamOrderService) { }

  ngOnInit(): void {
    this.fetchLatestOrder();
  }

  fetchLatestOrder(): void {
    this.iceCreamOrderService.getOrders().subscribe(orders => {
      // Assuming there is only one order for simplicity
      this.order = orders[orders.length - 1];

      // Calculate total price based on order details
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    if (this.order) {
      let totalPrice = 0;
      // Calculate price based on number of scoops
      for (const flavor of this.order.flavors) {
        totalPrice += flavor.scoops; // Each scoop costs 1 unit
      }
      // Add price of cone or cup
      totalPrice += this.order.cone === 'Cone' ? 5 : 4;

      // Assign total price to order object
      this.order.totalPrice = totalPrice;
    }
  }

  pay(): void {
    console.log('Selected Payment Method:', this.selectedPaymentMethod);
    // Implement payment logic here
  }
}
