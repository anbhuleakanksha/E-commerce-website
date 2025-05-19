
import { Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AdminDashbordComponent } from '../../components/admin-dashbord/admin-dashbord.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orderview',
  standalone: true,
  imports: [CommonModule,BrowserModule,ReactiveFormsModule],
  templateUrl: './orderview.component.html',
  styleUrl: './orderview.component.css'
})
export class OrderviewComponent {

}
