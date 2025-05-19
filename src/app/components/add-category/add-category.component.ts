import { Component } from '@angular/core';
import { CommonService } from '../../service/common.service';
import { CommonModule } from '@angular/common';
import { AdminDashbordComponent } from "../admin-dashbord/admin-dashbord.component";

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [CommonModule, AdminDashbordComponent],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.css'
})
export class AddCategoryComponent {

}
