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
    { id: 52, name: 'Mixcer', price: 1399, discount: 5, gst: 18, img: 'https://5.imimg.com/data5/SELLER/Default/2023/12/373079510/AO/TM/NF/203656587/81-jpg-500x500.jpg', quantity: 4, stock: 8, sale: false },
    { id: 53, name: 'fan', price: 1399, discount: 7, gst: 18, img: 'https://image.made-in-china.com/202f0j00StToUflMVYkW/4-Blade-Modern-Smart-Bushing-60-Inch-Ceiling-Fan-with-Wall-Control.webp', quantity: 3, stock: 6, sale: true },
    { id: 54, name: 'Iron', price: 1399, discount: 0, gst: 18, img: 'https://www.venushomeappliances.com/storage/app/product/09ee25e0-3973-11ec-845e-c529e2402238/20211030111759orega-image-0.jpg', quantity: 1, stock: 5, sale: false },
    { id: 55, name: 'Gittar', price: 1399, discount: 15, gst: 18, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQFPHNCHjr1RqTv0GDXV8iWdUbeTxVfDsS5hyK69tTzecsWW8xvc4TCcWlrvYV2wwrY3fc&usqp=CAU', quantity: 6, stock: 12, sale: true },

    { id: 56, name: 'Volume Speaker', price: 1399, discount: 20, gst: 18, img: 'https://m.media-amazon.com/images/I/713TUYjagQL.jpg', quantity: 5, stock: 10, sale: true },
    { id: 57, name: 'Tab ', price: 1399, discount: 1, gst: 18, img: 'https://www.digitaldreamsjaipur.com/wp-content/uploads/2020/06/Lenovo-Tab-M8-HD.jpg', quantity: 4, stock: 8, sale: false },
    { id: 58, name: 'Camera', price: 1399, discount: 6, gst: 18, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdy6xkKbxBEthVEbNiTn1dEhlRQeUjb0bJZ2MkpX6WJdColWR8xKfMZXV9NO__pOkRM2o&usqp=CAU', quantity: 3, stock: 6, sale: true },
    { id: 59, name: ' Hair StraightNing Machine', price: 1399, discount: 0, gst: 18, img: 'https://cdn.anscommerce.com/image/tr:e-sharpen-01,h-350,w-350,cm-pad_resize/data/philipspc/23jan2025/BHS526-00_1.jpg', quantity: 1, stock: 5, sale: false },
    { id: 60, name: 'Mobile phone', price: 1399, discount: 4, gst: 18, img: 'data:image/jpeg;base64,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', quantity: 6, stock: 12, sale: true }
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

