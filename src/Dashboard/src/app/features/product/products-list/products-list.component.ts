import { Component, OnInit, effect, inject } from '@angular/core';
import { Observable, debounceTime } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { IProduct } from '../types';
import { ProductsService } from '../products.service';
import { TextDatePipe } from '../../../shared/pipes/text-date';
import { RouterLink, RouterOutlet } from '@angular/router';
import { ProductSearchComponent } from '../product-search/product-search.component';
import { MatIconModule } from '@angular/material/icon';

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
  products$!: Observable<IProduct[]>;

  private productService = inject(ProductsService);

  ngOnInit(): void {
    this.doSearch(null);
  }

  doSearch($event: string | null) {
    this.products$ = this.productService.getProducts($event);
  }
}
