import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private cartItems: any[] = [];
  private cartCount = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCount.asObservable();

  constructor() {
    this.loadCart();
  }

  // ✅ Load cart from localStorage
  private loadCart() {
    const storedCart = localStorage.getItem('cartItems');
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
    this.updateCart();
  }

  // ✅ Add product to cart
  addToCart(product: any) {
    const existingProduct = this.cartItems.find(item => item.id === product.id);
    
    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      product.quantity = 1;
      this.cartItems.push(product);
    }

    this.updateCart();
  }

  // ✅ Get cart items
  getCartItems(): any[] {
    return this.cartItems;
  }

  // ✅ Increase quantity
  increaseQuantity(item: any) {
    item.quantity += 1;
    this.updateCart();
  }

  // ✅ Decrease quantity
  decreaseQuantity(item: any) {
    if (item.quantity > 1) {
      item.quantity -= 1;
      this.updateCart();
    }
  }

  // ✅ Remove product from cart
  removeProduct(index: number) {
    this.cartItems.splice(index, 1);
    this.updateCart();
  }

  // ✅ Update cart in localStorage and BehaviorSubject
  private updateCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    const totalItems = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.cartCount.next(totalItems);
  }

  // ✅ Clear cart
  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
    this.cartCount.next(0);
  }

  // ✅ User Authentication Logic
  private userNameSubject = new BehaviorSubject<string | null>(localStorage.getItem('userName'));
  userName$ = this.userNameSubject.asObservable();

  login(username: string) {
    localStorage.setItem('userName', username);
    this.userNameSubject.next(username);
  }

  logout() {
    localStorage.removeItem('userName');
    this.userNameSubject.next(null);
    this.clearCart();
    sessionStorage.clear();
  }
}
