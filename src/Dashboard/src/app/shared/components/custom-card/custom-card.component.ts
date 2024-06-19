import { Component, DestroyRef, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-custom-card',
  template: `
    <div class=" border shadow-md">
      <!-- <ng-content select="card-title"></ng-content>
      <div class="card-divider"></div>
      <ng-content select="card-body"></ng-content> -->
    </div>
  `,
  standalone: true,
  host:{
    'role': 'box'
  }
})
export class CustomCardComponent implements OnInit,OnChanges {
    @Input() name: string = '';
    constructor() {
        console.log('constructor');
  
    }

    ngOnChanges(changes: SimpleChanges): void {
       console.log('OnChange')
    }
    ngOnInit(): void {
       console.log('OnInit');
    }
}
