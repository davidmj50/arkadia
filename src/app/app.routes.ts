import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { ProductsComponent } from './components/products/products.component';
import { RegisterComponent } from './components/register/register.component';
import { NofoundComponent } from './components/nofound/nofound.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';

const adminModule = () => import('./admin/admin.module').then(mod => mod.AdminModule);

const routes: Routes = [
    { path: 'home', component: HomeComponent  },
    { path: 'contact', component: ContactComponent  },
    { path: 'login', component: LoginComponent  },
    { path: 'about', component: AboutComponent  },
    { path: 'products', component: ProductsComponent  },
    { path: 'productDetail', component: ProductDetailComponent  },
    { path: 'register', component: RegisterComponent  },
    { path: 'nofound', component: NofoundComponent  },
    { path: 'cartShopping', component: ShoppingCartComponent  },
    { 
        path: 'dashboard', 
        component: DashboardComponent,
        data: { title: 'Inicio'},
        children: [
            { 
                path: 'admin', 
                loadChildren: adminModule
            },
            { 
                path: 'nofound', 
                component: NofoundComponent
            },
            {
                path: '',
                redirectTo: 'dashboard/nofound',
                pathMatch: 'full'
            },
            {
                path: '**',
                redirectTo: 'dashboard/nofound',
                pathMatch: 'full'
            }
        ]
    },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' },
];

export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });