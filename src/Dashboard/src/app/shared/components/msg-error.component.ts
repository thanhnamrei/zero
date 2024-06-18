import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-msg-error',
  standalone: true,
  template: ` <div class=" text-sm text-red-400">{{ text }}</div> `,
})
export class MsgErrorComponent {
  @Input() text: string = '';
}
