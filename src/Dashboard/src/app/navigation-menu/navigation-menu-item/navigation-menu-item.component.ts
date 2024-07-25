import { Component, Output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { LinkComponent } from '../../shared/components/link/link.component';
import { CommonModule } from '@angular/common';
import { routes } from '../../app.routes';

@Component({
  selector: 'app-navigation-menu-item',
  standalone: true,
  imports: [MatIconModule, LinkComponent, CommonModule],
  templateUrl: './navigation-menu-item.component.html',
  styleUrl: './navigation-menu-item.component.css',
})
export class NavigationMenuItemComponent {
  open = false;

  collapse() {
    this.open = !this.open;
    console.log(routes);
  }
}
