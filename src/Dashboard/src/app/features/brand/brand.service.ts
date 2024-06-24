import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Brand } from './types';

@Injectable({
  providedIn: 'root',
})
export class BrandService {
  private apiUrl = 'http://localhost:5108/api/brands';

  constructor(private http: HttpClient) {}

  getAllBrands(): Observable<Brand[]> {
    return this.http.get<Brand[]>(this.apiUrl);
  }

  getBrandById(id: number): Observable<Brand> {
    const url = `${this.apiUrl}/${id}`;
    return this.http.get<Brand>(url);
  }

  createBrand(brand: Brand) {
    return this.http.post(this.apiUrl, brand);
  }

  updateBrand(id: number, brand: Brand) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.put<any>(url, brand);
  }

  deleteBrand(id: number) {
    const url = `${this.apiUrl}/${id}`;
    return this.http.delete(url);
  }
}
