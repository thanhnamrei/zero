import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-variants',
  standalone: true,
  imports: [],
  templateUrl: './product-variants.component.html',
  styleUrl: './product-variants.component.css',
})
export class ProductVariantsComponent implements OnInit {
  ngOnInit(): void {
    // console.log(this.activeRoute?.snapshot?.data['variants']);
  }
  readonly activeRoute = inject(ActivatedRoute);
}
