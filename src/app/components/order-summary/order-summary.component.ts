import { Component, OnInit } from '@angular/core';
import { IceCreamOrderService } from 'src/app/services/ice-cream-order.service';

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
      this.order = orders[orders.length - 1];

      // Calcular o preço total com base nos detalhes do pedido
      this.calculateTotalPrice();
    });
  }

  calculateTotalPrice(): void {
    if (this.order) {
      let totalPrice = 0;
      // Calcular o preço com base no número de bolas
      for (const flavor of this.order.flavors) {
        totalPrice += flavor.scoops; // Custo de bolas unidade
      }
      // Adicionar preço da casquinha ou copo
      totalPrice += this.order.cone === 'Casquinha' ? 5 : 4;

      // Multiplicar pelo número de pedidos
      totalPrice *= this.order.quantity;

      // Atribuir preço total ao objeto do pedido
      this.order.totalPrice = totalPrice.toFixed(2); // Arredondar para duas casas decimais
    }
  }

  pay(): void {
    console.log('Forma de pagamento:', this.selectedPaymentMethod);
    // Aqui iria a lógica do pagamento
  }
}
