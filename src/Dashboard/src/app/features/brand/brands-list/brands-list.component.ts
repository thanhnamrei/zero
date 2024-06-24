import { Component, OnInit, inject } from '@angular/core';
import { BrandService } from '../brand.service';
import { Observable } from 'rxjs';
import { Brand } from '../types';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-brands-list',
  templateUrl: './brands-list.component.html',
  standalone: true,
  imports: [AsyncPipe],
  providers: [BrandService],
})
export class BrandsListComponent implements OnInit {
  readonly brandService = inject(BrandService);
  brands$!: Observable<Brand[]>;
  constructor() {}

  ngOnInit(): void {
    this.brands$ = this.brandService.getAllBrands();
  }
}
