import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { BrandService } from '../brand.service';

@Component({
  selector: 'brand-create',
  templateUrl: './create-brand.component.html',
  standalone: true,
  imports: [ReactiveFormsModule, MatIconModule],
  providers: [BrandService],
})
export class CreateBrandComponent implements OnInit {
  readonly formBuilder = inject(FormBuilder);
  readonly brandService = inject(BrandService);
  brandForm!: FormGroup;

  createBrand() {
    this.brandService.createBrand(this.brandForm.value).subscribe(() => {
      console.log('Brand created successfully');
    });
  }

  constructor() {
    this.buildForm();
  }

  ngOnInit(): void {}

  buildForm() {
    this.brandForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: [''],
    });
  }
}
