import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule, FormsModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.css',
})
export class PaymentComponent {
  isRegistered: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  constructor(private cusSer: CommonService, private router: Router) {}

  // Method triggered on form submit
  payment(formData: any) {
    if (formData.valid) {
      this.cusSer.addpayment(formData.value).subscribe(
        (resp) => {
          console.log('User payment successfully', resp);
          alert('Payment successful! Click OK to go to Home.');
          this.isRegistered = true;
          this.successMessage = 'Payment registered successfully!';
          this.errorMessage = '';
          this.router.navigate(['/home']);
        },
        (err) => {
          console.log('Error while payment', err);
          this.errorMessage = 'Payment failed! Please try again.';
          this.successMessage = '';
        }
      );
    } else {
      this.errorMessage = 'Please fill all required fields.';
    }
  }
}
