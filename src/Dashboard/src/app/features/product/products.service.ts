import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand, Product } from './types';

@Injectable({ providedIn: 'root' })
export class ProductsService {
  constructor(private httpClient: HttpClient) {}

  getProducts(search: string | number | null) {
    let uriParams = new HttpParams();

    if (typeof search === 'string') {
      uriParams = uriParams.set('name', search);
    }
    if (search === 'number') {
      uriParams = uriParams.set('id', search);
    }

    return this.httpClient.get<Product[]>(
      'http://localhost:5108/api/Products',
      { params: uriParams }
    );
  }

  getBrands() {
    return this.httpClient.get<Brand[]>('http://localhost:5108/api/Brands');
  }
}
