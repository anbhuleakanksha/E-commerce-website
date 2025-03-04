import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { Subscription } from 'rxjs';
import { EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule, RouterOutlet, RouterModule],
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'] // ✅ Fixed styleUrls
})
export class HeaderComponent implements OnInit, OnDestroy {
  userName: string | null = '';
  cartItems: any[] = [];
  cartCount: number = 0;
  showCart: boolean = false;
  totalQuantity: number = 1; 
  searchQuery: string = '';
  
  private subscriptions: Subscription = new Subscription();

  constructor(private router: Router, private authService: AuthService) {}

  @Output() searchEvent = new EventEmitter<string>(); // ✅ Search event emitter

  ngOnInit() {
    // ✅ Subscribe to username updates (Real-time tracking)
    this.subscriptions.add(
      this.authService.userName$.subscribe((name) => {
        this.userName = name;
        this.calculateTotalQuantity();
      })
    );

    // ✅ Subscribe to cart updates
    this.subscriptions.add(
      this.authService.cart$.subscribe((cart) => {
        this.cartItems = cart;
        this.cartCount = cart.reduce((total, item) => total + item.quantity, 0); // Dynamically calculate count
      })
    );
  }

  // ✅ Cleanup subscriptions to avoid memory leaks
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

  // ✅ Logout & Clear Session
  logout() {
    localStorage.removeItem('userEmail'); // Instead of clearing all storage
    this.authService.clearCart(); // ✅ Clear the cart on logout
    this.userName = null;
    this.router.navigate(['/home']); // ✅ Redirect to home page
  }

  // ✅ Toggle Cart Visibility
  toggleCart() {
    this.showCart = !this.showCart;
  }

  // ✅ Get Total Price of Cart
  // getTotalPrice(): number {
  //   return this.cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  // }
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return total + this.getFinalPrice(item) * item.quantity;
    }, 0);
  }
  getFinalPrice(product: any): number {
    let discountedPrice = product.price * (1 - product.discount / 100); // Apply Discount
    let finalPrice = discountedPrice * (1 + product.gst / 100); // Apply GST
    return Math.round(finalPrice); // Round off
  }
  getTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  // ✅ Increase Quantity
  increaseQuantity(item: any) {
    this.authService.addToCart(item); // ✅ Use addToCart method to handle quantity logic
    this.calculateTotalQuantity();    // ✅ Update the total quantity
  }
  

  // ✅ Decrease Quantity for Specific Product
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.authService.decreaseQuantity(item);
      this.calculateTotalQuantity(); // ✅ Ensure total quantity updates
    }
  }
  

  // ✅ Calculate Total Quantity of All Products
  calculateTotalQuantity() {
    this.totalQuantity = this.cartItems.reduce((total, item) => total + item.quantity, 1);
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
 

  // ✅ Emit search query when input changes
  onSearch() {
    this.searchEvent.emit(this.searchQuery.trim()); // ✅ Emit trimmed searchQuery
  }
}
  

