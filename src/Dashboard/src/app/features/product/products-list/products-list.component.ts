import { Component, OnInit, effect, inject } from '@angular/core';
import { Observable, debounceTime, pipe } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Product, ProductViewModel } from '../types';
import { ProductsService } from '../products.service';
import { TextDatePipe } from '../../../shared/pipes/text-date';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { MatIconModule } from '@angular/material/icon';
import { error } from 'node:console';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [
    AsyncPipe,
    TextDatePipe,
    RouterLink,
    ProductSearchComponent,
    MatIconModule,
    RouterOutlet,
  ],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  readonly productService = inject(ProductsService);
  // products$!: Observable<Product[]>;

  products: ProductViewModel[] = [];

  ngOnInit(): void {
    this.doSearch(null);
  }

  doSearch($event: string | null) {
    this.productService.getProducts($event).subscribe(
      pipe(
        (products) => {
          this.products = products.map((p) => new ProductViewModel(p));
        },
        (error) => {
          this.products = [];
          console.error(error);
        }
      )
    );
  }
}
