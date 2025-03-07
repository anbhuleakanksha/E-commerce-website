import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../layout/components/header/header.component';

@Component({
  selector: 'app-ladiesshoes',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HeaderComponent],
  templateUrl: './ladiesshoes.component.html',
  styleUrl: './ladiesshoes.component.css'
})
export class LadiesshoesComponent {

products = [
    { id: 41, name: 'Juta', price: 1399, discount: 10, gst: 18, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQIlrXxPvXhRxA0VEBUUDsqOzsxO1vCjl8sDi15xKhbUZwli-kTvzVb0aDZhezlJ_z9UdU&usqp=CAU', quantity: 5, stock: 10, sale: true },
    { id: 42, name: 'Fancy Shoes  ', price: 1399, discount: 5, gst: 18, img: 'https://tiimg.tistatic.com/fp/1/007/812/comfortable-light-weight-star-printed-ladies-pink-casual-shoes-387.jpg', quantity: 4, stock: 8, sale: false },
    { id: 43, name: 'Sandl', price: 1399, discount: 7, gst: 18, img: 'https://images.meesho.com/images/products/76816764/ycw7j_512.webp', quantity: 3, stock: 6, sale: true },
    { id: 44, name: 'Flat Sandl', price: 1399, discount: 0, gst: 18, img: 'https://sreeleathers.com/cdn/shop/products/106809_250_2_600x600_crop_center.jpg?v=1626850987', quantity: 1, stock: 5, sale: false },
    { id: 45, name: 'Flat Black Sandl', price: 1399, discount: 15, gst: 18, img: 'https://m.media-amazon.com/images/I/61iBzQsDh5L._AC_UY1000_.jpg', quantity: 6, stock: 12, sale: true },

    { id: 46, name: 'Sandl', price: 1399, discount: 20, gst: 18, img: 'https://tiimg.tistatic.com/fp/1/007/767/comfortable-casual-wear-blue-parrot-color-lightweight-modern-design-mens-sandal-242.jpg', quantity: 5, stock: 10, sale: true },
    { id: 47, name: 'Professional Shoes', price: 1399, discount: 1, gst: 18, img: 'https://3.imimg.com/data3/ER/LJ/MY-14192772/img_2553-500x500.jpg', quantity: 4, stock: 8, sale: false },
    { id: 48, name: 'Traditional Juta', price: 1399, discount: 6, gst: 18, img: 'https://rukminim2.flixcart.com/image/850/1000/shoe/a/m/7/yellow-k-m-123-kellon-11-original-imae2hwfexmxqkyn.jpeg?q=20&crop=false', quantity: 3, stock: 6, sale: true },
    { id: 49, name: 'Kolapuri', price: 1399, discount: 0, gst: 18, img: 'https://rukminim2.flixcart.com/image/750/900/jehf4i80/sandal/f/2/s/black01-6-kolhapuri-chappal-black-original-imaf2c4zpzhbp5b8.jpeg?q=20&crop=false', quantity: 1, stock: 5, sale: false },
    { id: 50, name: 'Fancy Kolhapuri', price: 1399, discount: 4, gst: 18, img: 'https://i.pinimg.com/474x/81/60/dc/8160dc48b90209b8e2a20d328698ac24.jpg', quantity: 6, stock: 12, sale: true },
  
    { id: 51, name: 'kids sandl', price: 1399, discount: 20, gst: 18, img: 'https://sreeleathersonline.com/cdn/shop/files/IMG_7581_a7466c1b-4486-4493-9654-30aabfa5d7e5_1024x1024.png?v=1700832118', quantity: 5, stock: 10, sale: true },
    { id: 52, name: 'simple kids sandle', price: 1399, discount: 1, gst: 18, img: 'https://images.meesho.com/images/products/250827084/v3fpx_512.webp', quantity: 4, stock: 8, sale: false },
    { id: 53, name: 'kids juta', price: 1399, discount: 6, gst: 18, img: 'https://tiimg.tistatic.com/fp/1/008/384/fancy-footwear--310.jpg', quantity: 3, stock: 6, sale: true },
    { id: 54, name: 'fancy Chappal', price: 1399, discount: 0, gst: 18, img: 'https://images-cdn.ubuy.co.in/65a666eb7a900f22cd7b7192-kiderence-toddler-girl-sandals-open-toe.jpg', quantity: 1, stock: 5, sale: false },
    { id: 55, name: 'kids Fancy Sandle', price: 1399, discount: 4, gst: 18, img: 'https://images-cdn.ubuy.co.in/65f46a787eec49247761aa67-ginfive-toddler-girls-sandals-little.jpg', quantity: 6, stock: 12, sale: true }
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

