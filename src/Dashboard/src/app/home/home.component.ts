import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { combineLatest, filter, tap } from 'rxjs';
import {MatIconModule} from '@angular/material/icon';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink,MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  
  constructor(
    // private authService: AuthService,
    private router: Router
  ) {}


  login() {
    // this.authService.login('test@gmail.com','13343');

    // combineLatest([this.authService.authStatus$,this.authService.currentUser$]).pipe(
    //   filter(([authStatus,user]) => user.id),
    //   tap(([authStatus,user]) => {
    //     this.router.navigate(['/mangager'])
    //   })
    // ).subscribe();
  }

}
