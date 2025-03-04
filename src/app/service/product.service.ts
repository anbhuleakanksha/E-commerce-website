import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor() { }

  products = [
    { name: 'Laptop', category: 'electronics' },
    { name: 'Mixer', category: 'electronics' },
    { name: 'Smartphone', category: 'electronics' },
    { name: 'T-Shirt', category: 'clothing' },
    { name: 'Jeans', category: 'clothing' },
    { name: 'Running Shoes', category: 'shoes' },
    { name: 'Formal Shoes', category: 'shoes' },
    { name: 'Smart Watch', category: 'watches' },
    { name: 'Analog Watch', category: 'watches' }
  ];

  // Return all products that match the search query
  getMatchingProducts(searchText: string): { name: string, category: string }[] {
    return this.products.filter(p => p.name.toLowerCase().includes(searchText.toLowerCase()));
  }
}
