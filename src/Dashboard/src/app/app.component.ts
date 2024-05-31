import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { LinkComponent } from './shared/components/link/link.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, LinkComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Dashboard';
}
