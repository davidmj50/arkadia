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
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ShoppingCartComponent } from './components/shopping-cart/shopping-cart.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ModalShoppingCartComponent } from './components/shared/modal-shopping-cart/modal-shopping-cart.component';
import {ProgressSpinnerModule} from 'primeng/progressspinner';
import { LoaderModule } from './components/shared/loader/loader.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//#region Módulos y servicios importados de primeng
import { MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { ButtonModule } from 'primeng/button';


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
    NofoundComponent,
    ProductDetailComponent,
    ShoppingCartComponent,
    DashboardComponent,
    ModalShoppingCartComponent,
    ModalShoppingCartComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    APP_ROUTES,
    HttpClientModule,
    LoaderModule,
    ProgressSpinnerModule,
    ToastModule,
    MessageModule,
    MessagesModule,
    ButtonModule
  ],
  providers: [MessageService],
  bootstrap: [AppComponent]
})
export class AppModule { }
