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

export const routes: Routes = [
    { path: 'login', component: LoginComponent }, // ✅ Public route
    { path: 'register', component: RegisterComponent }, // ✅ Public route

    // ✅ Protected routes (Only accessible if logged in)
    { path: 'home', component: HomeComponent, canActivate: [authGuard] },
    { path: 'header', component: HeaderComponent, canActivate: [authGuard] },
    { path: 'footer', component: FooterComponent, canActivate: [authGuard] },
    { path: 'electrical', component: ElectricalComponent, canActivate: [authGuard] },
    { path: 'menswatch', component: MenswatchComponent, canActivate: [authGuard] },
    { path: 'ladieswatch', component: LadieswatchComponent, canActivate: [authGuard] },
    { path: 'ladiesshoes', component: LadiesshoesComponent, canActivate: [authGuard] },
    { path: 'ladycloth', component: LadyclothComponent, canActivate: [authGuard] },
    { path: 'menscloth', component: MensclothComponent, canActivate: [authGuard] },
    { path: 'cart', component: CardComponent, canActivate: [authGuard] },
    { path: 'order', component: OrderComponent,canActivate: [authGuard] },

    // ✅ Redirect base URL to login
    { path: '', redirectTo: 'login', pathMatch: 'full' },

    
];
