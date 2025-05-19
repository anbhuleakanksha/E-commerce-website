import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../layout/components/header/header.component';
import { CommonService } from '../../service/common.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-ladycloth',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HeaderComponent],
  templateUrl: './ladycloth.component.html',
  styleUrl: './ladycloth.component.css'
})
export class LadyclothComponent {


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
  

// products = [
//     { id: 31, name: 'Fancy dress', price: 1399, discount: 10, gst: 18, img: 'https://rukminim2.flixcart.com/image/850/1000/xif0q/dress/q/k/g/m-anarkali-western-party-wear-ethnic-belt-poly-crepe-ladies-original-imaghdfy9hhhxnyz.jpeg?q=20&crop=false', quantity: 5, stock: 10, sale: true },
//     { id: 32, name: 'Traditional Lehnga ', price: 1399, discount: 5, gst: 18, img: 'https://www.shreejeesuits.com/images/products/ladies-dress-material.webp', quantity: 4, stock: 8, sale: false },
//     { id: 33, name: 'Duppata Lehnga', price: 1399, discount: 7, gst: 18, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWJTLI82BfYwsi1chDfCzA__T79e7rkagFnw&s', quantity: 3, stock: 6, sale: true },
//     { id: 34, name: 'Nauvari', price: 1399, discount: 0, gst: 18, img: 'https://i.pinimg.com/236x/6c/06/89/6c0689435f90c190f7307ce7859a5543.jpg', quantity: 1, stock: 5, sale: false },
//     { id: 35, name: 'Fancci Black Suit', price: 1399, discount: 15, gst: 18, img: 'https://www.shutterstock.com/image-photo/angry-businesswoman-dressed-black-isolated-260nw-184875146.jpg', quantity: 6, stock: 12, sale: true },

//     { id: 36, name: 'Long Frock', price: 1399, discount: 20, gst: 18, img: 'https://img.freepik.com/premium-photo/beautiful-elegant-evening-women-s-dress-white-background_236836-26253.jpg', quantity: 5, stock: 10, sale: true },
//     { id: 37, name: 'kurta Set', price: 1399, discount: 1, gst: 18, img: 'https://m.media-amazon.com/images/I/81w4oVCoxcL._SX569_.jpg', quantity: 4, stock: 8, sale: false },
//     { id: 38, name: 'fancy Kurta', price: 1399, discount: 6, gst: 18, img: 'https://5.imimg.com/data5/SELLER/Default/2020/11/DO/MU/UH/48315824/designer-kurti-250x250.jpg', quantity: 3, stock: 6, sale: true },
//     { id: 39, name: 'jeans', price: 1399, discount: 0, gst: 18, img: 'https://rukminim2.flixcart.com/image/850/1000/k8ot7rk0/jean/w/h/v/30-ladiesjeans-60-high-waist-denim-original-imafqn6mcbhyymc6.jpeg?q=90&crop=false', quantity: 1, stock: 5, sale: false },
//     { id: 40, name: 'Blue Top', price: 1399, discount: 4, gst: 18, img: 'https://assets.myntassets.com/dpr_1.5,q_60,w_400,c_limit,fl_progressive/assets/images/30288540/2024/7/22/d654a22f-1b7b-44cd-9677-1761f07fad281721644269907BAESDRoll-UpSleevesDenimShirtStyleTop1.jpg', quantity: 6, stock: 12, sale: true },

//   ];
  
//   filteredProducts = [...this.products]; 

//   cartMap: { [key: number]: any } = {}; // 🔥 Map for quick lookup

//   constructor(private authService: AuthService) {}

//   ngOnInit() {
//     this.authService.cart$.subscribe(cart => {
//       this.cartMap = cart.reduce((acc, item) => {
//         acc[item.id] = item;
//         return acc;
//       }, {});
//     });
//   }

//   addToCart(product: any) {
//     this.authService.addToCart(product);
    
//   }
//   onSearch(query: string) {
//     console.log("Search query:", query); // ✅ Debugging
//     if (!query) {
//       this.filteredProducts = [...this.products];
//     } else {
//       this.filteredProducts = this.products.filter(product =>
//         product.name.toLowerCase().includes(query.toLowerCase())
//       );
//     }
//   }
//   increaseQuantity(product: any) {
//     if (this.cartMap[product.id].quantity < product.stock) {
//       this.authService.increaseQuantity(product);
//     } else {
//       alert(`Stock limit reached for ${product.name}`);
//     }
//   }
  

//   decreaseQuantity(product: any) {
//     this.authService.decreaseQuantity(product);
//   }

//   getFinalPrice(product: any): number {
//     let discountedPrice = product.price * (1 - product.discount / 100); // Apply Discount
//     let finalPrice = discountedPrice * (1 + product.gst / 100); // Apply GST
//     return Math.round(finalPrice); // Round off
//   }

}

