import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../layout/components/header/header.component';

@Component({
  selector: 'app-ladieswatch',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule,HeaderComponent],
  templateUrl: './ladieswatch.component.html',
  styleUrl: './ladieswatch.component.css'
})
export class LadieswatchComponent implements OnInit {
   

    products = [
      { id: 1, name: 'Bulgari Serpenti Watch', price: 1399, img: 'https://swisswatchesforsale.com/wp-content/uploads/2019/11/103145-750x1038.jpg', quantity: 5, sale: true },
      { id: 2, name: 'Old Cartier Panthere Watch', price: 1399, img: 'https://artoftimeindia.com/cdn/shop/products/WGPN0009_1_600x.jpg?v=1601403354', quantity: 4, sale: false },
      { id: 3, name: 'Patek Philippe', price: 1399, img: 'https://images-na.ssl-images-amazon.com/images/I/51uQckj8C%2BL.jpg', quantity: 3, sale: true },
      { id: 4, name: 'Tissot Watch', price: 1399, img: 'https://ad.kapoorwatch.com/content/images/product/L3.430.4.92.9-400.webp', quantity: 1, sale: false },
      { id: 5, name: 'Titan Watch', price: 1399, img: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw1ff77f49/images/Titan/Catalog/95146KD02_1.jpg?sw=800&sh=800', quantity: 6, sale: true }
    ];
  filteredProducts = [...this.products]; 

  cartMap: { [key: number]: any } = {}; // 🔥 Map for quick lookup

  constructor(private authService: AuthService) {}

  ngOnInit() {
    this.authService.cart$.subscribe(cart => {
      this.cartMap = cart.reduce((acc, item) => {
        acc[item.id] = item;
        return acc;
      }, {});
    });
  }

  addToCart(product: any) {
    this.authService.addToCart(product);
    
  }

  // increaseQuantity(product: any) {
  //   this.authService.increaseQuantity(product);
  // }

  // decreaseQuantity(product: any) {
  //   this.authService.decreaseQuantity(product);
  // }

  onSearch(query: string) {
    if (!query) {
      this.filteredProducts = [...this.products]; // ✅ Reset to all products when search is empty
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) // ✅ Case-insensitive match
      );
    }
  }
  increaseQuantity(product: any) {
    if (this.cartMap[product.id].quantity < product.stock) {
      this.authService.increaseQuantity(product);
    } else {
      alert(`Stock limit reached for ${product.name}`);
    }
  }

  decreaseQuantity(product: any) {
    this.authService.decreaseQuantity(product);
  }
}
