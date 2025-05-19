import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from '../../service/common.service';
import { Router } from '@angular/router';
import { NgxPaginationModule } from 'ngx-pagination';
import { AdminDashbordComponent } from '../../components/admin-dashbord/admin-dashbord.component';



@Component({
  selector: 'app-get-allproduct',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule,NgxPaginationModule,AdminDashbordComponent],
  templateUrl: './get-allproduct.component.html',
  styleUrl: './get-allproduct.component.css'
})
export class GetAllproductComponent {

  constructor(private commonser:CommonService,private router:Router){}

  p:any;

  id:any;
  cproduct:any;

  update(id:any){
    this.router.navigate([`/products/${id}`]);
  }

  ngOnInit(){
    this.getData();

    // this.id = this.route.snapshot.params['id'];
    // console.log(this.id);
    // this.getData();
  }

  devArray:any;

  uDev(uData:any){
    this.commonser.updateProduct(uData.value,this.id).subscribe(
     (resp)=>{
       console.log(resp);
       this.router.navigate(["/dashboard"]);
     },
     (err)=>{
       console.log(err);
     }
    )
 }

  delete(id:any){
    if(confirm(`Do you want to delete ${id} Record`)){
      this.commonser.deleteByProductId(id).subscribe(
        (resp)=>{
          console.log(resp);
          window.location.reload();
        },
        (err)=>{
          console.log(err);
        }
      )
    }
  }

  getData(){
    this.commonser.getProducts().subscribe(
      (resp)=>{
        console.log("Fetched Products:", resp); // ✅ Debugging line
        this.devArray = resp;
      },
      (err)=>{
        console.log("Error while fetching products", err);
      }
    )
  }
  

}


