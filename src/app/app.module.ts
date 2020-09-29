import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { ContactComponent } from './components/contact/contact.component';
import { NavigationComponent } from './components/shared/navigation/navigation.component';
import { FooterComponent } from './components/shared/footer/footer.component';
import { APP_ROUTES } from './app.routes';
import { AboutComponent } from './components/about/about.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProductsComponent } from './components/products/products.component';
import { NofoundComponent } from './components/nofound/nofound.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ContactComponent,
    NavigationComponent,
    FooterComponent,
    AboutComponent,
    RegisterComponent,
    LoginComponent,
    ProductsComponent,
    NofoundComponent
  ],
  imports: [
    BrowserModule,
    APP_ROUTES
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
