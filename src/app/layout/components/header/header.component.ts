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

  @Output() searchEvent = new EventEmitter<string>(); 

  ngOnInit() {
 
    this.subscriptions.add(
      this.authService.userName$.subscribe((name) => {
        this.userName = name;
        this.calculateTotalQuantity();
      })
    );

    this.subscriptions.add(
      this.authService.cart$.subscribe((cart) => {
        this.cartItems = cart;
        this.cartCount = cart.reduce((total, item) => total + item.quantity, 0);
      })
    );
  }

 
  ngOnDestroy() {
    this.subscriptions.unsubscribe();
  }

 
  logout() {
    localStorage.removeItem('userEmail'); 
    this.authService.clearCart(); 
    this.userName = null;
    this.router.navigate(['/home']); 
  }


  toggleCart() {
    this.showCart = !this.showCart;
  }

 
 
  getTotalPrice(): number {
    return this.cartItems.reduce((total, item) => {
      return total + this.getFinalPrice(item) * item.quantity;
    }, 0);
  }
  getFinalPrice(product: any): number {
    let discountedPrice = product.price * (1 - product.discount / 100); 
    let finalPrice = discountedPrice * (1 + product.gst / 100); 
    return Math.round(finalPrice); 
  }
  getTotalQuantity(): number {
    return this.cartItems.reduce((total, item) => total + item.quantity, 0);
  }

  
  increaseQuantity(item: any) {
    this.authService.addToCart(item); 
    this.calculateTotalQuantity();   
  }
  

  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      this.authService.decreaseQuantity(item);
      this.calculateTotalQuantity(); 
    }
  }
  

 
  calculateTotalQuantity() {
    this.totalQuantity = this.cartItems.reduce((total, item) => total + item.quantity, 1);
  }

  removeProduct(index: number) {
    this.authService.removeProduct(index);
  }

  placeOrder() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty! Add some products first.');
    } else {
      this.router.navigate(['/order']);
    }
  }
 

 
  onSearch() {
    this.searchEvent.emit(this.searchQuery.trim()); 
  }
}
  

