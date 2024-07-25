import { Component } from '@angular/core';
import { LinkComponent } from '../shared/components/link/link.component';
import { MatIconModule } from '@angular/material/icon';
import { NavigationMenuItemComponent } from './navigation-menu-item/navigation-menu-item.component';

@Component({
  selector: 'app-navigation-menu',
  standalone: true,
  imports: [LinkComponent, MatIconModule, NavigationMenuItemComponent],
  templateUrl: './navigation-menu.component.html',
  styleUrl: './navigation-menu.component.css',
})
export class NavigationMenuComponent {}
