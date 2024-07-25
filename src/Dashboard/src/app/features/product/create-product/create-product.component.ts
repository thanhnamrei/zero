import { Component, OnInit, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { Brand, Category, Product, Variant } from '../types';
import { ProductsService } from '../products.service';
import { AsyncPipe } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { TextInputComponent } from '../../../shared/components/text-input/text-input.component';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [
    AsyncPipe,
    MatIconModule,
    FormsModule,
    ReactiveFormsModule,
    TextInputComponent,
  ],
  templateUrl: './create-product.component.html',
  styleUrl: './create-product.component.css',
})
export class CreateProductComponent implements OnInit {
  readonly formBuilder = inject(FormBuilder);
  readonly productsService: ProductsService = inject(ProductsService);

  brands$!: Observable<Brand[]>;
  categories$!: Observable<Category[]>;

  productForm!: FormGroup;

  constructor() {
    this.buildProductForm();
  }

  ngOnInit(): void {
    this.brands$ = this.productsService.getBrands();
    this.categories$ = this.productsService.getCategories();
  }

  buildProductForm(product?: Product) {
    this.productForm = this.formBuilder.group({
      name: [product?.name ?? ''],
      description: [product?.description ?? ''],
      brandId: [0],
      variants: this.formBuilder.array(
        this.buildVariantArray(product?.variants || [])
      ),
    });
  }

  buildVariantArray(variants?: Variant[]) {
    const groups = [];
    if (variants?.length === 0) {
      groups.push(this.buildVariantFormControl(1));
    } else {
      variants?.forEach((v) => {
        groups.push(this.buildVariantFormControl(v.variantId));
      });
    }

    return groups;
  }

  buildVariantFormControl(index: number) {
    return this.formBuilder.group({
      color: [''],
      size: [''],
      price: [''],
      stock: [''],
      sku: [''],
      material: [''],
    });
  }

  addVariant() {
    this.variantsArray.push(
      this.buildVariantFormControl(
        this.productForm.get('variants')?.value.length + 1
      )
    );
  }

  get variantsArray() {
    return this.productForm.get('variants') as FormArray;
  }

  get nameControl() {
    return this.productForm.get('name') as FormControl;
  }

  onSubmit() {
    this.productsService.createProduct(this.productForm.value).subscribe();
  }
}
