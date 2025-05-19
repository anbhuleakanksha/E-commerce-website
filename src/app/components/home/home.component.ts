import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {


    isRegistered: boolean = false;
    successMessage: string = '';
    errorMessage: string = '';
  
    feedback = {
      name: '',
      email: '',
      message: ''
    };
  
    constructor(private cusSer: CommonService, private router: Router) {}
  
    Feedback(formData: any) {
      if (formData.valid) {
        this.cusSer.addFeedback(this.feedback).subscribe(
          (resp) => {
            console.log('Feedback submitted successfully', resp);
            alert('Thank you for your feedback!');
            this.successMessage = 'Feedback submitted successfully!';
            this.errorMessage = '';
            this.feedback = { name: '', email: '', message: '' }; // reset form
            formData.reset();
          },
          (err) => {
            console.error('Error submitting feedback', err);
            this.errorMessage = 'Failed to submit feedback. Try again!';
            this.successMessage = '';
          }
        );
      } else {
        this.errorMessage = 'Please fill all required fields.';
      }
    }
  }
