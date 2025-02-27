import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  

  constructor(private router:Router,private authService: AuthService){}
  username: string = ''; // Example input field
  password: string = ''; // Example input field

  

  

  login() {
    if (this.username === 'Akanksha@gmail.com' && this.password === '12345') {
      this.authService.login(this.username); // ✅ Update username dynamically
      this.router.navigate(['/home']); // ✅ Redirect to home page
      alert('Login successful');
    } else {
      alert('Invalid username or password');
    }
  }
}
