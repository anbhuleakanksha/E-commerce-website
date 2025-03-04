import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../layout/components/header/header.component';

@Component({
  selector: 'app-menswatch',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HeaderComponent],
  templateUrl: './menswatch.component.html',
  styleUrl: './menswatch.component.css'
})
export class MenswatchComponent{
   

  products = [
    { id: 11, name: 'Omega mens Watch', price: 1399, discount: 10, gst: 18, img: 'https://www.lumbers.co.uk/media/catalog/product/cache/1d0d90599f0659951c2bddfe85708221/0/1/0166333_1_1.jpg', quantity: 5, stock: 10, sale: true },
    { id: 12, name: 'Gucci mens', price: 1399, discount: 5, gst: 18, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9xUc5BFpOCGbXb0jSt6J8bdDNK5VGuenQPeOTefaTiAJVrLEHKtjDBXfWPgrkiQyFcyA&usqp=CAU', quantity: 4, stock: 8, sale: false },
    { id: 13, name: 'Titan Quiz', price: 1399, discount: 7, gst: 18, img: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw00d4f44c/images/Titan/Catalog/90146SL01_1.jpg?sw=800&sh=800', quantity: 3, stock: 6, sale: true },
    { id: 14, name: 'Breitling mens watch', price: 1399, discount: 0, gst: 18, img: 'https://artoftimeindia.com/cdn/shop/products/RB0139211G1P1_600x.jpg?v=1655820445', quantity: 1, stock: 5, sale: false },
    { id: 15, name: 'cartier mens ', price: 1399, discount: 15, gst: 18, img: 'https://img.tatacliq.com/images/i18//658Wx734H/MP000000021613428_658Wx734H_202406301654001.jpeg', quantity: 6, stock: 12, sale: true },

    { id: 16, name: 'Sofa Chaiiwc watches', price: 1399, discount: 20, gst: 18, img: 'https://www.horbiter.com/wp-content/uploads/2023/08/iwc-portugieser-wristwatch-1954.jpeg', quantity: 5, stock: 10, sale: true },
    { id: 17, name: 'jaeger-Lecoultre WWTC watch', price: 1399, discount: 1, gst: 18, img: 'https://www.vanrijkestatejewellers.com/cdn/shop/products/9636_1200x1200.jpg?v=1668784516', quantity: 4, stock: 8, sale: false },
    { id: 18, name: 'Audi top piguet', price: 1399, discount: 6, gst: 18, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRJOAVldJ9FjYu6rNrrXkt9mEnAb0_4rUEvW8LB9yKVRf1GU-kg9UBf-_0DFA-faLMzJJM&usqp=CAU', quantity: 3, stock: 6, sale: true },
    { id: 19, name: 'jaeger-Lecoultre WWTC watch', price: 1399, discount: 0, gst: 18, img: 'https://images.vestiairecollective.com/images/resized/w=1246,q=75,f=auto,/produit/silver-steel-jaeger-lecoultre-watch-35671343-1_3.jpg', quantity: 1, stock: 5, sale: false },
    { id: 20, name: 'Smart Watch', price: 1399, discount: 4, gst: 18, img: 'https://img.tatacliq.com/images/i17//437Wx649H/MP000000022124162_437Wx649H_202405102124041.jpeg', quantity: 6, stock: 12, sale: true }
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
    console.log("Search query:", query); // ✅ Debugging
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
    let discountedPrice = product.price * (1 - product.discount / 100); // Apply Discount
    let finalPrice = discountedPrice * (1 + product.gst / 100); // Apply GST
    return Math.round(finalPrice); // Round off
  }
}
