import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';

const routes: Routes = [
    { path: 'home', component: HomeComponent  },
    { path: 'contact', component: ContactComponent  },
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: '**', redirectTo: 'home', pathMatch: 'full' }
];

export const APP_ROUTES = RouterModule.forRoot(routes, { useHash: true });