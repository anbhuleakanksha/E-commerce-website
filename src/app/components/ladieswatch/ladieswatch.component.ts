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
    { id: 1, name: 'Bulgari Serpenti Watch', price: 1399, discount: 10, gst: 18, img: 'https://swisswatchesforsale.com/wp-content/uploads/2019/11/103145-750x1038.jpg', quantity: 5, stock: 10, sale: true },
    { id: 2, name: 'Old Cartier Panthere Watch', price: 1399, discount: 5, gst: 18, img: 'https://artoftimeindia.com/cdn/shop/products/WGPN0009_1_600x.jpg?v=1601403354', quantity: 4, stock: 8, sale: false },
    { id: 3, name: 'Patek Philippe', price: 1399, discount: 7, gst: 18, img: 'https://images-na.ssl-images-amazon.com/images/I/51uQckj8C%2BL.jpg', quantity: 3, stock: 6, sale: true },
    { id: 4, name: 'Tissot Watch', price: 1399, discount: 0, gst: 18, img: 'https://ad.kapoorwatch.com/content/images/product/L3.430.4.92.9-400.webp', quantity: 1, stock: 5, sale: false },
    { id: 5, name: 'Titan Watch', price: 1399, discount: 15, gst: 18, img: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw1ff77f49/images/Titan/Catalog/95146KD02_1.jpg?sw=800&sh=800', quantity: 6, stock: 12, sale: true },

    { id: 6, name: 'Smart Watch', price: 1399, discount: 20, gst: 18, img: 'https://sc04.alicdn.com/kf/H42fe7464172949c49027d25174da4b2dg.png', quantity: 5, stock: 10, sale: true },
    { id: 7, name: 'jaeger-Lecoultre WWTC watch', price: 1399, discount: 1, gst: 18, img: 'https://www.vanrijkestatejewellers.com/cdn/shop/products/9636_1200x1200.jpg?v=1668784516', quantity: 4, stock: 8, sale: false },
    { id: 8, name: 'Smart Watch', price: 1399, discount: 6, gst: 18, img: 'https://images.squarespace-cdn.com/content/v1/56fc16bba3360c2000b979d0/1705612059332-UTP44ZXGGL62MBKT6QTN/1.jpeg?format=1000w', quantity: 3, stock: 6, sale: true },
    { id: 9, name: 'Wrist Watch', price: 1399, discount: 0, gst: 18, img: 'https://timeavenue.com/wp-content/uploads/2024/03/10A326-5106-2-1-600x600.webp', quantity: 1, stock: 5, sale: false },
    { id: 10, name: 'Titan Watch', price: 1399, discount: 4, gst: 18, img: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw1ff77f49/images/Titan/Catalog/95146KD02_1.jpg?sw=800&sh=800', quantity: 6, stock: 12, sale: true }
  ];
  
  filteredProducts = [...this.products]; 

  cartMap: { [key: number]: any } = {}; 

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



  onSearch(query: string) {
    if (!query) {
      this.filteredProducts = [...this.products]; 
    } else {
      this.filteredProducts = this.products.filter(product =>
        product.name.toLowerCase().includes(query.toLowerCase()) 
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

  getFinalPrice(product: any): number {
    let discountedPrice = product.price * (1 - product.discount / 100); 
    let finalPrice = discountedPrice * (1 + product.gst / 100); 
    return Math.round(finalPrice); 
  }
}
