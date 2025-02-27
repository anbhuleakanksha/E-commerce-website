import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterOutlet, RouterModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent {
  userName: string | null = '';
  cartItems: any[] = [];
  cartCount: number = 0;
  showCart: boolean = false;

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    // ✅ Subscribe to username updates (Even After Refresh)
    this.authService.userName$.subscribe((name) => {
      this.userName = name;
    });

    // ✅ Fetch cart data (Real-time updates)
    this.authService.cartCount$.subscribe((count) => {
      this.cartCount = count;
      this.cartItems = this.authService.getCartItems(); // ✅ Update UI on cart change
    });
  }

  // ✅ Logout & Clear Session
  logout() {
    localStorage.clear();
    localStorage.removeItem('userEmail');
    this.authService.clearCart(); // ✅ Clear the cart on logout
    this.userName = null;
    this.router.navigate(['/home']); // ✅ Redirect to home page
  }

  // ✅ Toggle Cart Visibility
  toggleCart() {
    this.showCart = !this.showCart;
  }

  // ✅ Get Total Price of Cart
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  }

  // ✅ Increase Quantity
  increaseQuantity(item: any) {
    this.authService.increaseQuantity(item);
  }

  // ✅ Decrease Quantity
  decreaseQuantity(item: any) {
    this.authService.decreaseQuantity(item);
  }

  // ✅ Remove Product from Cart
  removeProduct(index: number) {
    this.authService.removeProduct(index);
  }

  // ✅ Proceed to Order Page
  placeOrder() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty! Add some products first.');
    } else {
      this.router.navigate(['/order']);
    }
  }
}
