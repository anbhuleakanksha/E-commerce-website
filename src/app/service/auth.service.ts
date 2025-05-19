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


  private loadCart() {
    const storedCart = localStorage.getItem('cartItems');
    this.cartItems = storedCart ? JSON.parse(storedCart) : [];
    this.updateCart();
  }

  
  addToCart(product: any) {
    const existingProduct = this.cartItems.find((item) => item.id === product.id);
  
    if (existingProduct) {
      
      existingProduct.quantity += 1;
    } else {
      
      this.cartItems.push({ ...product, quantity: 1 });
      this.cartCountSubject.next(this.cartCountSubject.value + 1);
    }
  
    this.updateCart(); 
  }
  
  getCartItems(): any[] {
    return [...this.cartItems];
    return this.cartItems;
  }


  increaseQuantity(product: any) {
    this.cartItems = this.cartItems.map(item =>
      item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
    );
    this.updateCart(); 
  }

 
  decreaseQuantity(product: any) {
    this.cartItems = this.cartItems
      .map(item =>
        item.id === product.id ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter(item => item.quantity > 0);
    this.updateCart();
  }


  removeProduct(index: number) {
    this.cartItems = this.cartItems.filter((_, i) => i !== index);
    this.updateCart();
  }

  
  private updateCart() {
    localStorage.setItem('cartItems', JSON.stringify(this.cartItems));
    const totalItems = this.cartItems.reduce((total, item) => total + item.quantity, 0);
    this.cartSubject.next([...this.cartItems]);
    this.cartCountSubject.next(totalItems);
  }


  clearCart() {
    this.cartItems = [];
    localStorage.removeItem('cartItems');
    this.cartSubject.next([]);
    this.cartCountSubject.next(0);
  }

  
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



  // getCartItems(): any[] {
  //   return this.cartItems;
  // }

  // ✅ Add This Method to Save Cart Items
  setCartItems(items: any[]): void {
    this.cartItems = items;
  }


}
