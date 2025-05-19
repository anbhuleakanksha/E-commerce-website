import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../service/common.service';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent {

  isRegistered: boolean = false;
  successMessage: string = '';
  errorMessage: string = '';

  cartItems: any[] = [];
  totalPrice: number = 0;

  order = {
    name: '',
    email: '',
    address: '',
    total: 0
  };

  constructor(private authservice: AuthService,private cusSer:CommonService, private router: Router) {}

  ngOnInit() {
    this.cartItems = this.authservice.getCartItems() || [];  // ✅ Get latest cart data
    console.log('Cart Items on Order Page:', this.cartItems); // ✅ Debugging Line
  
    this.calculateTotalPrice();
  }
  
  calculateTotalPrice() {
    this.totalPrice = this.cartItems.reduce((total, item) => total + (item.finalPrice || 0), 0);
  }
  getTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  getFinalPrice(product: any): number {
    let discountedPrice = product.price * (1 - product.discount / 100); 
    let finalPrice = discountedPrice * (1 + product.gst / 100); 
    return Math.round(finalPrice); 
  }
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return total + this.getFinalPrice(item) * item.quantity;
    }, 0);
  }
  
  // confirmOrder() {
  //   alert(`Order confirmed for ${this.order.name}. Total: ₹${this.getTotalPrice()}`);
  //   this.authservice.clearCart();
  //   this.router.navigate(['/home']);
  // }

  removeFromCart(item: any) {
    this.cartItems = this.cartItems.filter(cartItem => cartItem !== item);
  }

  confirmOrder() {
    const orderData = {
      orname: this.order.name,  // <-- Binds from form
      address: this.order.address,
      price: this.getTotalPrice(),  // <-- Dynamically calculated
      totalQuantity: this.getTotalQuantity(), // <-- You need to define this method
      user: { rid: 1 }, // <-- Replace 1 with actual user ID if needed
      product: this.cartItems.map(item => ({
        pid: item.pid,        // or item.id
        name: item.name,
        price: this.getFinalPrice(item)
      }))
      
    };
  
    console.log("Sending order:", orderData);
  
    this.cusSer.addorder(orderData).subscribe({
      next: (resp) => {
        alert("Order placed successfully!");
        this.router.navigate(['/payment']);
      },
      error: (err) => {
        console.error("Something went wrong:", err);
        alert("Something went wrong! Try again later.");
      }
    });
  }
  
  }
  

  



