import { Component } from '@angular/core';
import {  RouterOutlet } from '@angular/router';
import { NavigationMenuComponent } from './navigation-menu/navigation-menu.component';
import {MatIconModule} from '@angular/material/icon';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,MatIconModule, NavigationMenuComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Dashboard';
}
