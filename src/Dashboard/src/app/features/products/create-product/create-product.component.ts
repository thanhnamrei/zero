import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand } from '../types';
import { ProductsService } from '../products.service';
import { AsyncPipe } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TextInputComponent } from '../../../shared/components/text-input/text-input.component';
import { forbiddenNameValidator } from '../../../shared/directives/forbiddenNameValidator';
// import { UniSkuValidator } from '../../../shared/directives/sku.directive';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [AsyncPipe, FormsModule, ReactiveFormsModule, TextInputComponent],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent implements OnInit {
  constructor(private formBuilder: FormBuilder) {}

  productForm = this.formBuilder.group({
    name: ['',[Validators.required,forbiddenNameValidator(/bob/i)]],
    description: [''],
    brandId: [0],
    variants: this.formBuilder.array([
      this.formBuilder.group({
        color: [''],
        size: [''],
        price: [''],
        stock: [''],
        sku: [''],
        material: [''],
      }),
    ]),
  });

  get variants() {
    return this.productForm.get('variants') as FormArray;
  }

  get nameControl() {
    return this.productForm.get('name') as FormControl;
  }

  ngOnInit(): void {
    this.brands$ = this.productsService.getBrands();
  }

  brands$!: Observable<Brand[]>;
  private productsService: ProductsService = inject(ProductsService);

  onSubmit() {
    console.log(this.productForm.value);
  }
}
