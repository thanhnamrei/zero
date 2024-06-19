import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CustomCardComponent } from '../../shared/components/custom-card/custom-card.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterOutlet,CustomCardComponent],
  templateUrl: `./product.component.html`,
  styles: ``,
})
export class ProductComponent {}
