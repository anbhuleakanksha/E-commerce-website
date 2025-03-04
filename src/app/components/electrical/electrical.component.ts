import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../layout/components/header/header.component';

@Component({
  selector: 'app-electrical',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HeaderComponent],
  templateUrl: './electrical.component.html',
  styleUrl: './electrical.component.css'
})
export class ElectricalComponent {
 

  products = [
    { id: 51, name: 'laptop', price: 1399, discount: 10, gst: 18, img: 'https://5.imimg.com/data5/YR/DY/FR/SELLER-18983365/hp-15-intel-core-i5-full-hd-laptop-500x500.jpg', quantity: 5, stock: 10, sale: true },
    { id: 52, name: 'Mobile Phone', price: 1399, discount: 5, gst: 18, img: 'https://5.imimg.com/data5/SELLER/Default/2023/12/373079510/AO/TM/NF/203656587/81-jpg-500x500.jpg', quantity: 4, stock: 8, sale: false },
    { id: 53, name: 'Patek Philippe', price: 1399, discount: 7, gst: 18, img: 'https://image.made-in-china.com/202f0j00StToUflMVYkW/4-Blade-Modern-Smart-Bushing-60-Inch-Ceiling-Fan-with-Wall-Control.webp', quantity: 3, stock: 6, sale: true },
    { id: 54, name: 'Tissot Watch', price: 1399, discount: 0, gst: 18, img: 'https://www.venushomeappliances.com/storage/app/product/09ee25e0-3973-11ec-845e-c529e2402238/20211030111759orega-image-0.jpg', quantity: 1, stock: 5, sale: false },
    { id: 55, name: 'Titan Watch', price: 1399, discount: 15, gst: 18, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFPHNCHjr1RqTv0GDXV8iWdUbeTxVfDsS5hyK69tTzecsWW8xvc4TCcWlrvYV2wwrY3fc&usqp=CAU', quantity: 6, stock: 12, sale: true },

    { id: 56, name: 'Smart Watch', price: 1399, discount: 20, gst: 18, img: 'https://m.media-amazon.com/images/I/713TUYjagQL.jpg', quantity: 5, stock: 10, sale: true },
    { id: 57, name: 'jaeger-Lecoultre WWTC watch', price: 1399, discount: 1, gst: 18, img: 'https://www.digitaldreamsjaipur.com/wp-content/uploads/2020/06/Lenovo-Tab-M8-HD.jpg', quantity: 4, stock: 8, sale: false },
    { id: 58, name: 'Smart Watch', price: 1399, discount: 6, gst: 18, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdy6xkKbxBEthVEbNiTn1dEhlRQeUjb0bJZ2MkpX6WJdColWR8xKfMZXV9NO__pOkRM2o&usqp=CAU', quantity: 3, stock: 6, sale: true },
    { id: 59, name: 'Wrist Watch', price: 1399, discount: 0, gst: 18, img: 'https://cdn.anscommerce.com/image/tr:e-sharpen-01,h-350,w-350,cm-pad_resize/data/philipspc/23jan2025/BHS526-00_1.jpg', quantity: 1, stock: 5, sale: false },
    { id: 60, name: 'Titan Watch', price: 1399, discount: 4, gst: 18, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFPHNCHjr1RqTv0GDXV8iWdUbeTxVfDsS5hyK69tTzecsWW8xvc4TCcWlrvYV2wwrY3fc&usqp=CAU', quantity: 6, stock: 12, sale: true }
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

  getFinalPrice(product: any): number {
    let discountedPrice = product.price * (1 - product.discount / 100); // Apply Discount
    let finalPrice = discountedPrice * (1 + product.gst / 100); // Apply GST
    return Math.round(finalPrice); // Round off
  }
}

