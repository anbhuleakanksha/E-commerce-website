import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-ladieswatch',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './ladieswatch.component.html',
  styleUrl: './ladieswatch.component.css'
})
export class LadieswatchComponent {
  
  products= [
    { name: 'Bulgari Serpenti Watch', price: 1399, img: 'https://swisswatchesforsale.com/wp-content/uploads/2019/11/103145-750x1038.jpg', quantity: 1 },
    { name: 'Old Cartier Panthere Watch', price: 1399, img: 'https://artoftimeindia.com/cdn/shop/products/WGPN0009_1_600x.jpg?v=1601403354', quantity: 1 },
    { name: 'Patek Philippe', price: 1399, img: 'https://images-na.ssl-images-amazon.com/images/I/51uQckj8C%2BL.jpg', quantity: 1 },
    { name: 'Tissot Watch', price: 1399, img: 'https://ad.kapoorwatch.com/content/images/product/L3.430.4.92.9-400.webp', quantity: 1 },
    { name: 'Titan Watch', price: 1399, img: 'https://www.titan.co.in/dw/image/v2/BKDD_PRD/on/demandware.static/-/Sites-titan-master-catalog/default/dw1ff77f49/images/Titan/Catalog/95146KD02_1.jpg?sw=800&sh=800', quantity: 1 }
  ];

  constructor(private authservice: AuthService) {}

 


  addToCart(product: any) {
    this.authservice.addToCart(product);
    alert(`${product.name} added to cart!`);
  }

}
