import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonService } from '../../../service/common.service';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,FormsModule,RouterOutlet,RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  constructor(private router: Router ,private authservice:AuthService) {}



  userName: string | null = '';

  ngOnInit() {
    this.userName = localStorage.getItem('userName'); // ✅ Get username
    this.cartItems = this.authservice.getCartItems();
     // Subscribe to cart count updates
     this.authservice.cartCount$.subscribe(count => {
      this.cartCount = count;
    });
  }


  logout() {
    localStorage.clear(); // ✅ Clear user session
    this.userName = null;
    this.router.navigate(['/home']); // ✅ Redirect to login page
  }

  cartItems: any[] = [];
  cartCount: number = 0;
  showCart: boolean = false;

  
  toggleCart() {
    this.showCart = !this.showCart;
  }

  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price, 0);
  }

  placeOrder() {
    if (this.cartItems.length === 0) {
      alert("Your cart is empty! Add some products first.");
    } else {
      this.router.navigate(['/order']); // Navigate to order page
    }
    
}

}