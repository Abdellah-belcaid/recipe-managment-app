import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/service/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  username: string = '';
  password: string = '';

  constructor(private authService: AuthenticationService, private router: Router) { }

  register(): void {
    // Perform registration logic and navigate to login page on success
    this.authService.register(this.username, this.password).subscribe(
      () => {
        console.log('Registration successful.');
        this.router.navigate(['/login']);
      },
      (error) => {
        console.error('Error during registration:', error);
        // Handle error (display a message to the user, etc.)
      }
    );
  }
}