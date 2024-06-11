import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router'; // Importação do Router
import { IceCreamOrderService } from '../services/ice-cream-order.service';

@Component({
  selector: 'app-ice-cream-order',
  templateUrl: './ice-cream-order.component.html',
  styleUrls: ['./ice-cream-order.component.scss']
})
export class IceCreamOrderComponent implements OnInit {
  orderForm!: FormGroup;
  flavorOptions = ['Chocolate', 'Vanilla', 'Strawberry'];
  quantityOptions = [1, 2, 3];
  coneOptions = ['Cone', 'Cup'];

  constructor(
    private formBuilder: FormBuilder,
    private iceCreamOrderService: IceCreamOrderService,
    private router: Router // Injeção do Router
  ) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      flavors: this.formBuilder.array([
        this.createFlavor()
      ]),
      quantity: [1, Validators.required],
      cone: ['Cone', Validators.required]
    });
  }

  createFlavor(): FormGroup {
    return this.formBuilder.group({
      flavor: ['', Validators.required],
      scoops: [1, [Validators.required, Validators.min(1), Validators.max(3)]]
    });
  }

  get flavors() {
    return this.orderForm.get('flavors') as FormArray;
  }

  addFlavor(): void {
    this.flavors.push(this.createFlavor());
  }

  removeFlavor(index: number): void {
    this.flavors.removeAt(index);
  }

  onSubmit(): void {
    if (this.orderForm.valid) {
      const order = {
        flavors: this.orderForm.value.flavors.map((flavor: any) => {
          return { flavor: flavor.flavor, scoops: flavor.scoops };
        }),
        quantity: this.orderForm.value.quantity,
        cone: this.orderForm.value.cone,
        totalPrice: this.calculateTotalPrice()
      };
      this.iceCreamOrderService.addOrder(order);
      this.orderForm.reset();
      this.router.navigate(['/order-summary']); // Redirecionamento para a página de resumo do pedido
    } else {
      // Handle form validation errors
    }
  }

  calculateTotalPrice(): number {
    const scoopsPrice = this.orderForm.value.flavors.reduce((total: number, flavor: any) => total + flavor.scoops, 0);
    const conePrice = this.orderForm.value.cone === 'Cone' ? 5 : 4;
    const totalPrice = scoopsPrice + conePrice;
    return totalPrice;
  }
}
