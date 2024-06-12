import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Router } from '@angular/router'; 
import { IceCreamOrderService } from 'src/app/services/ice-cream-order.service';

@Component({
  selector: 'app-ice-cream-order',
  templateUrl: './ice-cream-order.component.html',
  styleUrls: ['./ice-cream-order.component.scss']
})
export class IceCreamOrderComponent implements OnInit {
  orderForm!: FormGroup;
  flavorOptions = ['Chocolate', 'Baunilha', 'Morango'];
  quantityOptions = [1, 2, 3];
  coneOptions = ['Casquinha', 'Copo'];
  scoopsPrice = 1; // Preço por bola de sorvete

  constructor(
    private formBuilder: FormBuilder,
    private iceCreamOrderService: IceCreamOrderService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.orderForm = this.formBuilder.group({
      flavors: this.formBuilder.array([
        this.createFlavor()
      ]),
      quantity: [1, Validators.required],
      cone: ['Casquinha', Validators.required]
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
          return { flavor: flavor.flavor, scoops: Number(flavor.scoops) };
        }),
        quantity: Number(this.orderForm.value.quantity),
        cone: this.orderForm.value.cone,
        totalPrice: this.calculateTotalPrice()
      };
      this.iceCreamOrderService.addOrder(order).subscribe(response => {
        console.log('Pedido enviado com sucesso:', response);
        this.orderForm.reset();
        this.router.navigate(['/order-summary']);
      }, error => {
        console.error('Erro ao enviar o pedido:', error);
      });
    } else {
      console.log('Erro: Formulário inválido');
    }
  }

  calculateTotalPrice(): number {
    const scoopsPrice = this.orderForm.value.flavors.reduce((total: number, flavor: any) => total + Number(flavor.scoops), 0) * this.scoopsPrice;
    const conePrice = this.orderForm.value.cone === 'Casquinha' ? 5 : 4;
    const totalPrice = scoopsPrice + conePrice;
    console.log(`Total de bolas: ${scoopsPrice}, Preço do recipiente: ${conePrice}, Preço total: ${totalPrice}`);
    return totalPrice;
  }
}
