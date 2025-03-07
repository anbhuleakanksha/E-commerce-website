import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../../service/common.service';
import { BrowserModule } from '@angular/platform-browser';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule,FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  isRegistered: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';
  constructor(private cusSer:CommonService,private router: Router){}

register(FormData:any){
  this.cusSer.addUser(FormData.value).subscribe(
    (resp)=>{
      console.log("User registered successfully",resp);
      alert('Registration successful! Click OK to go to Home.');
      this.isRegistered = true;
      this.successMessage = 'User registered successfully!';
        this.errorMessage = '';
        this.router.navigate(['/home']);
    },
    (err)=>{
      console.log("Error while registering user",err);
      this.errorMessage = 'Registration failed! Please try again.';
        this.successMessage = '';
    }
  )
}
  
}
