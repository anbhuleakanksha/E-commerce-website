import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminDashbordComponent } from '../../components/admin-dashbord/admin-dashbord.component';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule,BrowserModule,ReactiveFormsModule,AdminDashbordComponent],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css'
})
export class OrderComponent {

}
