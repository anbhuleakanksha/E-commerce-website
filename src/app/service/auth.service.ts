import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private cartItems: any[] = [];
  private cartSubject = new BehaviorSubject<any[]>([]);
  cart$ = this.cartSubject.asObservable();

  private cartCountSubject = new BehaviorSubject<number>(0);
  cartCount$ = this.cartCountSubject.asObservable();

  private userNameSubject = new BehaviorSubject<string | null>(localStorage.getItem('userName'));
  userName$ = this.userNameSubject.asObservable();

  constructor() {
    this.loadCart();
  }

  // ✅ Load cart from localStorage
  private loadCart() {
    const storedCart = localStorage.getItem('cartItems');
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
    this.updateCart();
  }

  // ✅ Add product to cart (Prevent duplicates)
  addToCart(product: any) {
    const existingProduct = this.cartItems.find((item) => item.id === product.id);
  
    if (existingProduct) {
      // ✅ Just increase quantity, do not update cart count
      existingProduct.quantity += 1;
    } else {
      // ✅ Add new product, increase cart count
      this.cartItems.push({ ...product, quantity: 1 });
      this.cartCountSubject.next(this.cartCountSubject.value + 1); // ✅ Only increment for new product
    }
  
    this.updateCart(); // ✅ Update cart data
  }
  // ✅ Get updated cart items
  getCartItems(): any[] {
    return [...this.cartItems];
  }

  // ✅ Increase quantity
  increaseQuantity(product: any) {
    this.cartItems = this.cartItems.map(item =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    this.updateCart(); // ✅ This exists in AuthService
  }

  // ✅ Decrease quantity (Remove if quantity reaches 0)
  decreaseQuantity(product: any) {
    this.cartItems = this.cartItems
      .map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);
    this.updateCart();
  }

  // ✅ Remove product from cart
  removeProduct(index: number) {
    this.cartItems = this.cartItems.filter((_, i) => i !== index);
    this.updateCart();
  }

  // ✅ Update cart in localStorage and notify subscribers
  private updateCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    const totalItems = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.cartSubject.next([...this.cartItems]);
    this.cartCountSubject.next(totalItems);
  }

  // ✅ Clear cart
  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
    this.cartSubject.next([]);
    this.cartCountSubject.next(0);
  }

  // ✅ User Authentication Logic
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
