import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from '../../layout/components/header/header.component';

@Component({
  selector: 'app-menscloth',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,HeaderComponent],
  templateUrl: './menscloth.component.html',
  styleUrl: './menscloth.component.css'
})
export class MensclothComponent {

products = [
    { id: 21, name: 'Pitch Shirt', price: 1399, discount: 10, gst: 18, img: 'https://images.meesho.com/images/products/306851998/d8ay1_512.jpg', quantity: 5, stock: 10, sale: true },
    { id: 22, name: 'T-shirt', price: 1399, discount: 5, gst: 18, img: 'https://assets.ajio.com/medias/sys_master/root/20210404/gWyc/606a14247cdb8c1f149237b1/-473Wx593H-461398279-black-MODEL.jpg', quantity: 4, stock: 8, sale: false },
    { id: 23, name: 'Line Shirt', price: 1399, discount: 7, gst: 18, img: 'https://www.textileinfomedia.com/img/eunb/formal-wear-strip-design-mens-shirt-full.jpg', quantity: 3, stock: 6, sale: true },
    { id: 24, name: 'Jacket Set', price: 1399, discount: 0, gst: 18, img: 'https://www.designer-mart.com/cdn/shop/files/designer-mart-glamorous-men-shirts-designer-mart-1.jpg?v=1689348489', quantity: 1, stock: 5, sale: false },
    { id: 25, name: 'Chekx Shirt ', price: 1399, discount: 15, gst: 18, img: 'https://images.meesho.com/images/products/415172169/yewqb_512.webp', quantity: 6, stock: 12, sale: true },

    { id: 26, name: 'Formal Armani', price: 1399, discount: 20, gst: 18, img: 'https://cottonworld.net/cdn/shop/files/M-PANTS-16181-20961-GREY_1.jpg?v=1734613559', quantity: 5, stock: 10, sale: true },
    { id: 27, name: 'Jogar', price: 1399, discount: 1, gst: 18, img: 'https://lookagain.scene7.com/is/image/OttoUK/600w/Zip-Off-Cargo-Pants-by-Man%E2%80%99s-World~25430312FRSP.jpg', quantity: 4, stock: 8, sale: false },
    { id: 28, name: 'Jeans', price: 1399, discount: 6, gst: 18, img: 'https://jadeblue.com/cdn/shop/files/Y42Z_1.jpg?v=1713266991', quantity: 3, stock: 6, sale: true },
    { id: 29, name: 'Black fancy formal', price: 1399, discount: 0, gst: 18, img: 'https://www.cliths.com/cdn/shop/products/formal-trouser-american-elm-black-slim-fit-formal-trouser-for-men-cotton-formal-pants-for-office-wear-13814398648386_1024x1024.jpg?v=1632806874', quantity: 1, stock: 5, sale: false },
    { id: 30, name: 'Night-Pant', price: 1399, discount: 4, gst: 18, img: 'https://assets.myntassets.com/w_412,q_60,dpr_2,fl_progressive/assets/images/22208992/2023/3/3/1ca51e6d-8e0c-4bd1-8968-b449c28159101677835710351TrackPants2.jpg', quantity: 6, stock: 12, sale: true },

    { id: 101, name: 'Traditional Kurta', price: 1399, discount: 20, gst: 18, img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGoSkDi3a2IEh8c417p_gRwXKNHmAS4UXhxgWBVm_y83-nRWbyuRCfYG5gHPufDKbkjmM&usqp=CAU', quantity: 5, stock: 10, sale: true },
    { id: 102, name: 'Dhotar Kurta', price: 1399, discount: 1, gst: 18, img: 'https://m.media-amazon.com/images/I/513vVfcGxjL._SX425_.jpg', quantity: 4, stock: 8, sale: false },
    { id: 103, name: 'Kurta Set', price: 1399, discount: 6, gst: 18, img: 'https://groomzstyle.com/wp-content/uploads/2024/06/51dVRrygWL._SY741_.jpg', quantity: 3, stock: 6, sale: true },
    { id: 104, name: 'Black Stylish Kurta', price: 1399, discount: 0, gst: 18, img: 'https://qph.cf2.quoracdn.net/main-qimg-6b274ca6e365d538d6ea3cfb9de017a9-lq', quantity: 1, stock: 5, sale: false },
    { id: 105, name: 'Sky-Blue Awosome Kurta', price: 1399, discount: 4, gst: 18, img: 'https://m.media-amazon.com/images/I/515mQQyAQyL.jpg', quantity: 6, stock: 12, sale: true }
  
  
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
    console.log("Search query:", query); 
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
