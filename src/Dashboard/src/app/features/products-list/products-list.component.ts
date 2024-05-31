import { Component, OnInit, inject } from '@angular/core';
import { ProductsService } from './products.service';
import { Observable } from 'rxjs';
import { Product } from './types';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',

})
export class ProductsListComponent  implements OnInit {

  products$!: Observable<Product[]>;

  private productService = inject(ProductsService); // use inject
  
  ngOnInit(): void {
    this.products$ = this.productService.getProducts();
  }

}
