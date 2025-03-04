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
    // { path: 'search/:query', component: SearchComponent },
    // { path: 'search-results', component: SearchResultsComponent },
    { path: 'home', component: HomeComponent },
    { path: 'header', component: HeaderComponent },
    { path: 'footer', component: FooterComponent },
    { path: 'electrical', component: ElectricalComponent },
    { path: 'menswatch', component: MenswatchComponent },
    { path: 'ladieswatch', component: LadieswatchComponent },
    { path: 'ladiesshoes', component: LadiesshoesComponent },
    { path: 'ladycloth', component: LadyclothComponent },
    { path: 'menscloth', component: MensclothComponent },
    { path: 'cart', component: CardComponent},
    { path: 'order', component: OrderComponent },
    // { path: '**', redirectTo: '' }

    // ✅ Redirect base URL to login
    // { path: '', redirectTo: 'login', pathMatch: 'full' },

    
];
