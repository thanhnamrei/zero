import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { User } from '../../../auth/user';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {
  readonly formBuilder = inject(FormBuilder);

  formGroup!: FormGroup;


  buildForm(user?: User) {
    this.formGroup = this.formBuilder.group({
      name: [user?.name ?? ''],
      dateOfBirth: [user?.dateOfBirth ?? '']
    })
  }

  // get dateOfBirth() {
  //   return this.formGroup.get('dateOfBirth')?.value || new Date();
  // }

  // get age() {
  //   return (new Date()).getFullYear() - this.dateOfBirth.getFullYear();
  // }

  dateOfBirth = signal(this.formGroup.get('dateOfBirth')?.value || new Date());
  age = computed(() => (new Date()).getFullYear() - this.dateOfBirth().getFullYear());
}
