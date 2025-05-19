import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { HeaderComponent } from './layout/components/header/header.component';
import { FooterComponent } from './layout/components/footer/footer.component';
import { RegisterComponent } from './layout/components/register/register.component';
import { ElectricalComponent } from './components/electrical/electrical.component';
import { MenswatchComponent } from './components/menswatch/menswatch.component';
import { LadieswatchComponent } from './components/ladieswatch/ladieswatch.component';
import { LadiesshoesComponent } from './components/ladiesshoes/ladiesshoes.component';
import { LadyclothComponent } from './components/ladycloth/ladycloth.component';
import { MensclothComponent } from './components/menscloth/menscloth.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guard/auth.guard';
import { CardComponent } from './components/card/card.component';
import { OrderComponent } from './components/order/order.component';
import { ProductsComponent } from './admincomponents/products/products.component';
import { GetAllproductComponent } from './admincomponents/get-allproduct/get-allproduct.component';
import { SidenavComponent } from './admincomponents/sidenav/sidenav.component';
import { PaymentComponent } from './components/payment/payment.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AdminDashbordComponent } from './components/admin-dashbord/admin-dashbord.component';
import { AdminLayoutComponent } from './components/admin-layout/admin-layout.component';
import { OrderviewComponent } from './admincomponents/orderview/orderview.component';


export const routes: Routes = [
    { path: 'login', component: LoginComponent }, 
    { path: '', component: RegisterComponent },
    { path: 'home', component: HomeComponent },
    { path: 'electrical', component: ElectricalComponent },
    { path: 'menswatch', component: MenswatchComponent },
    { path: 'ladieswatch', component: LadieswatchComponent },
    { path: 'ladiesshoes', component: LadiesshoesComponent },
    { path: 'ladycloth', component: LadyclothComponent },
    { path: 'menscloth', component: MensclothComponent },
    { path: 'cart', component: CardComponent },
    { path: 'order', component: OrderComponent },
    {path:'payment',component:PaymentComponent},

      
    { path: 'products', component: ProductsComponent },
    { path: 'get-allproduct', component: GetAllproductComponent },
    { path: 'sidenav', component: SidenavComponent },
    {path:'add-category',component:AddCategoryComponent},
    {path:'admin-dashbord',component:AdminDashbordComponent},
   {path:'orderview',component:OrderviewComponent},
]


