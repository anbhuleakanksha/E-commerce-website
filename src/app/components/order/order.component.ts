import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule ],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

  cartItems: any[] = [];
  totalPrice: number = 0;

  
  order = {
    name: '',
    email: '',
    address: '',
    total: 0
  };

  constructor(private authservice: AuthService, private router: Router) {}

  ngOnInit() {
    this.cartItems = this.authservice.getCartItems();
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  confirmOrder() {
    alert(`Order confirmed for ${this.order.name}. Total: ₹${this.getTotalPrice()}`);
    this.authservice.clearCart(); // Clear cart after order
    this.router.navigate(['/']); // Redirect to home page
  }

  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  removeFromCart(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
    // this.saveCart();
  }


  }

