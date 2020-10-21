import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { ListProductsComponent } from './list-products/list-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { AddProductsComponent } from './add-products/add-products.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { AddUsersComponent } from './add-users/add-users.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { LoaderModule } from '../components/shared/loader/loader.module';
import {ToastModule} from 'primeng/toast';
import { AdminMessagesComponent } from './admin-messages/admin-messages.component';
import { AttendMessagesComponent } from './attend-messages/attend-messages.component';



@NgModule({
  imports: [
    CommonModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    LoaderModule,
    ToastModule,
  ],
  declarations: [
    ListProductsComponent,
    EditProductsComponent,
    AddProductsComponent,
    ListUsersComponent,
    EditUsersComponent,
    AddUsersComponent,
    ListCategoriesComponent,
    AddCategoriesComponent,
    EditCategoriesComponent,
    AdminMessagesComponent,
    AttendMessagesComponent
  ],
  providers: [
  ]
})
export class AdminModule { }
