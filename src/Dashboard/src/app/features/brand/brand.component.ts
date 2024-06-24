import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-brand',
  template: `<router-outlet></router-outlet>`,
  standalone: true,
  imports: [RouterOutlet],
})
export class BrandComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    // Initialization code goes here
  }
}
