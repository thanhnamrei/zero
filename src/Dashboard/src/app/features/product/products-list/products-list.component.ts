import { Component, OnInit, effect, inject } from '@angular/core';
import { Observable, debounceTime } from 'rxjs';
import { AsyncPipe } from '@angular/common';
import { Product } from '../types';
import { ProductsService } from '../products.service';
import { TextDatePipe } from '../../../shared/pipes/text-date';
import { RouterLink } from '@angular/router';
import { ProductSearchComponent } from '../product-search/product-search.component';

@Component({
  selector: 'app-products-list',
  standalone: true,
  imports: [AsyncPipe, TextDatePipe, RouterLink, ProductSearchComponent],
  templateUrl: './products-list.component.html',
  styleUrl: './products-list.component.css',
})
export class ProductsListComponent implements OnInit {
  products$!: Observable<Product[]>;

  private productService = inject(ProductsService);

  ngOnInit(): void {}

  doSearch($event: string | null) {
    this.products$ = this.productService.getProducts($event);
  }
}
