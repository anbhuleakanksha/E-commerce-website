import { RouterModule } from '@angular/router';
import { routes } from './app.routes'; // or wherever your routes are
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AdminDashbordComponent } from './components/admin-dashbord/admin-dashbord.component';
import { BrowserModule } from '@angular/platform-browser';

@NgModule({
  declarations: [
  
    
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(routes), // ✅ must be included
  ]
})
export class AppModule {}
