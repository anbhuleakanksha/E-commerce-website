import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private cartItems: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);

  cartCount$ = this.cartCount.asObservable(); // Observable for cart count

  addToCart(product: any) {
    this.cartItems.push(product);
    this.cartCount.next(this.cartItems.length); // Update cart count
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart() {
    this.cartItems = [];
    this.cartCount.next(0);
  }
}
