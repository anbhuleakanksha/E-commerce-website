import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonService } from '../../service/common.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-ladieswatch',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ladieswatch.component.html',
  styleUrl: './ladieswatch.component.css'
})
export class LadieswatchComponent implements OnInit {

  products: any[] = []; 
  filteredProducts: any[] = []; 
  pid: string | null = null;
  cartMap: { [key: number]: any } = {}; 

  constructor(
    private authService: AuthService,
    private cusSer: CommonService,
    private route: ActivatedRoute 
  ) {}

  ngOnInit(): void {
    this.pid = this.route.snapshot.paramMap.get('id'); 
    console.log("Product ID:", this.pid);
     this.getProducts();

     this.authService.cart$.subscribe(cart => {
      this.cartMap = cart.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});
    });
  }

  getProducts(): void {
    this.cusSer.getProducts().subscribe({
      next: (data) => {
        console.log('API Response:', data); 

        if (Array.isArray(data)) {
          this.filteredProducts = data; 
          data.forEach(product => console.log('Image URL:', product.imageUrl)); 
        } else {
          console.error('Invalid API response format:', data);
          this.filteredProducts = [];
        }
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      }
    });
}

  addToCart(product: any) {
    this.authService.addToCart(product);
  }

  onSearch(query: string): void {
    console.log("Search query:", query); 
    if (!query) {
      this.filteredProducts = [...this.products];
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase())
      );
    }
  }

  increaseQuantity(product: any): void {
    if (this.cartMap[product.id]?.quantity < product.stock) {
      this.authService.increaseQuantity(product);
    } else {
      alert(`Stock limit reached for ${product.name}`);
    }
  }

  decreaseQuantity(product: any): void {
    this.authService.decreaseQuantity(product);
  }

  getFinalPrice(product: any): number {
    let discountedPrice = product.price * (1 - product.discount / 100);
    let finalPrice = discountedPrice * (1 + product.gst / 100);
    return Math.round(finalPrice);
  }

}




