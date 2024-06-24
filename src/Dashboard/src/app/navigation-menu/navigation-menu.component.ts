import { Component } from '@angular/core';
import { LinkComponent } from '../shared/components/link/link.component';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [LinkComponent],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.css'
})
export class NavigationMenuComponent {

}
