import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { SidenavComponent } from "../../admincomponents/sidenav/sidenav.component";
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NavigationEnd, Router } from '@angular/router';

@Component({
  selector: 'app-admin-dashbord',
  standalone: true,
  imports: [CommonModule, RouterModule,RouterModule],
  templateUrl: './admin-dashbord.component.html',
  styleUrl: './admin-dashbord.component.css'
})
export class AdminDashbordComponent
  {

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
    
      showProductMenu: boolean = false;
      showOrderMenu: boolean = false;
      showCustomerMenu: boolean = false;
      
      toggleProductMenu() {
        this.showProductMenu = !this.showProductMenu;
      }
      
      toggleOrderMenu() {
        this.showOrderMenu = !this.showOrderMenu;
      }
      
      toggleCustomerMenu() {
        this.showCustomerMenu = !this.showCustomerMenu;
      }
      
      
    
    
  }

