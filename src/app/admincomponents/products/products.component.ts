import { Component } from '@angular/core';
import { AuthService } from '../../service/auth.service';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { AdminDashbordComponent } from '../../components/admin-dashbord/admin-dashbord.component';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,AdminDashbordComponent],
  templateUrl: './products.component.html',
  styleUrl: './products.component.css'
})
export class ProductsComponent {
  p: any[] = []; // Store fetched products

  constructor(private cusSer: CommonService, private router: Router) {}

  product(form: any, fileInput: any) {
    const formData = new FormData();

    // Append form fields
    formData.append('name', form.value.name);
    formData.append('price', form.value.price);
    formData.append('gst', form.value.gst);
    formData.append('discount', form.value.discount);
    formData.append('quantity', form.value.quantity);

    // Append the image file
    if (fileInput.files.length > 0) {
        formData.append('image', fileInput.files[0]); // ✅ Ensure key matches backend
    }

    this.cusSer.addProduct(formData).subscribe(
        (resp) => {
            console.log("Product added successfully", resp);
            this.router.navigate(['/home']);
            form.reset();
            this.getProducts(); // Refresh product list
        },
        (err) => {
            console.log("Error while adding product", err);
        }
    );
}



  // Define the missing getProducts() method
  getProducts() {
    this.cusSer.getProducts().subscribe(
      (resp) => {
        this.p = resp; // Store fetched products
        console.log("Fetched Products:", this.p);
      },
      (err) => {
        console.log("Error while fetching products", err);
      }
    );
  }

  // Call getProducts when the component initializes
  ngOnInit() {
    this.getProducts();
  }


  
}