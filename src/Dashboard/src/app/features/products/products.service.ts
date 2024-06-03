import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand, Product } from './types';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private http: HttpClient) {}

  getProducts() {
    return this.http.get<Product[]>('http://localhost:5108/api/Products');
  }

  getBrands() {
    return this.http.get<Brand[]>('http://localhost:5108/api/Brands');
  }
}
