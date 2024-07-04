import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Brand, IProduct } from './types';
import { Observable } from 'rxjs';

export interface IProductService {
  getProducts(search: string | number | null): Observable<IProduct[]>;
  getBrands(): Observable<Brand[]>;
}

@Injectable({ providedIn: 'root' })
export class ProductsService implements IProductService {
  constructor(private httpClient: HttpClient) {}

  getProducts(search: string | number | null) {
    let uriParams = new HttpParams();

    if (typeof search === 'string') {
      uriParams = uriParams.set('name', search);
    }
    if (search === 'number') {
      uriParams = uriParams.set('id', search);
    }

    return this.httpClient.get<IProduct[]>(
      'http://localhost:5108/api/products',
      { params: uriParams }
    );
  }

  getBrands() {
    return this.httpClient.get<Brand[]>('http://localhost:5108/api/brands');
  }

  createProduct(body: any) {
    console.log(body);
    return this.httpClient.post('http://localhost:5108/api/Products', body);
  }
}
