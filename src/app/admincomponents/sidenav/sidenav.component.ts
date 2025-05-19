import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [CommonModule,FormsModule,ReactiveFormsModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.css'
})
export class SidenavComponent {


  isCollapsed = false;

    toggleSidebar() {
      this.isCollapsed = !this.isCollapsed;
    }
  


  showSidebar = false;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        const sidebarRoutes = ['/products', '/get-allproduct', '/sidenav', '/add-category'];
        this.showSidebar = sidebarRoutes.includes(this.router.url);
      }
    });
  }

  isSidebarOpen = false;
  dropdowns = {
    home: false,
    profile: false,
    settings: false
  };


  // toggleDropdown(menu: string) {
  //   this.dropdowns[menu] = !this.dropdowns[menu];
  // }
}
