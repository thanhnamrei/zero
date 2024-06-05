import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-input',
  templateUrl: './text-input.component.html',
  standalone: true,
  imports: [ReactiveFormsModule],
})
export class TextInputComponent {
  @Input() control!: FormControl;
  @Input() label: string = '';
}
