import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  private readonly formBuilder = inject(FormBuilder);

  loginForm!: FormGroup;

  constructor() {
    this.buildLoginForm();
  }

  buildLoginForm() {
    this.loginForm = this.formBuilder.group({

    })
  }
}
