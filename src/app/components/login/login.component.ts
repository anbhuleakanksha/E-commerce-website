import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AdminService } from '../../service/admin.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  

  constructor(private router:Router,private adminser:AdminService){}
  username: string = ''; // Example input field
  password: string = ''; // Example input field

  

  login() {
    if (this.username === 'Akanksha@gmail.com' && this.password === '12345') { // Example logic
      localStorage.setItem('userName', this.username); // ✅ Store user session
      this.router.navigate(['/home']); // ✅ Redirect to home page
      alert('username  login successfully');
    } else {
      alert('Invalid username or password');
    }
  }
}
