import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-link',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './link.component.html',
  template: ``,
})
export class LinkComponent {
  @Input() href: string = '';
  @Input() text: string = '';
}
