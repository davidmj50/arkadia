import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { NofoundComponent } from './components/nofound/nofound.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent  },
    { path: 'contact', component: ContactComponent  },
    { path: 'login', component: LoginComponent  },
    { path: 'about', component: AboutComponent  },
    { path: 'products', component: ProductsComponent  },
    { path: 'productDetail', component: ProductDetailComponent  },
    { path: 'register', component: RegisterComponent  },
    { path: 'nofound', component: NofoundComponent  },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });