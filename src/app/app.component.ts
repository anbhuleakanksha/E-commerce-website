import { Component } from '@angular/core';
import {RouterOutlet } from '@angular/router';
import { HeaderComponent } from './layout/components/header/header.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { CommonModule } from '@angular/common';
import { Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,HeaderComponent,FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'E-Commarce-website';



  showHeaderFooter = true;

  constructor(private router: Router) {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
      
        const adminRoutes = ['/products', '/get-allproduct', '/sidenav','/add-category','/admin-dashbord'];
        this.showHeaderFooter = !adminRoutes.includes(this.router.url);
      }
    });
}
// constructor(private router: Router) {
//   this.router.events.subscribe(event => {
//     if (event instanceof NavigationEnd) {
//       // Define routes where you want to show the sidebar
//       const sidebarRoutes = ['/products', '/get-allproduct', '/sidenav', '/add-category'];

//       // Define routes where you want to hide the header/footer
//       const adminRoutes = ['/products', '/get-allproduct', '/sidenav', '/add-category'];

//       // Control visibility
//       this.showSidebar = sidebarRoutes.includes(this.router.url);
//       this.showHeaderFooter = !adminRoutes.includes(this.router.url);
//     }
//   });
// }

}