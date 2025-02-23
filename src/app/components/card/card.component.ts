import { Component } from '@angular/core';
import { Ladieswatch } from "../../models/ladieswatch";
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-card',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent {
  // cartItems: Ladieswatch[] = [];

  // constructor(private authservice: AuthService) {}

  // ngOnInit(): void {
  //   this.authservice.cart$.subscribe((cartItems: Ladieswatch[]) => { 
  //     this.cartItems = cartItems; // ✅ Update cart items properly
  //   });
  // }
}
