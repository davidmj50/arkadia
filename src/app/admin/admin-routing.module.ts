import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductsComponent } from './add-products/add-products.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';
import { ListUsersComponent } from './list-users/list-users.component';
import { EditUsersComponent } from './edit-users/edit-users.component';
import { AddUsersComponent } from './add-users/add-users.component';

const routes: Routes = [
  { path: 'addProducts', component: AddProductsComponent },
  { path: 'products', component: ListProductsComponent },
  { path: 'editProducts', component: EditProductsComponent },
  { path: 'addCategories', component: AddCategoriesComponent },
  { path: 'categories', component: ListCategoriesComponent },
  { path: 'editCategories/:id', component: EditCategoriesComponent },
  { path: 'addUsers', component: AddUsersComponent },
  { path: 'users', component: ListUsersComponent },
  { path: 'editUser/:id', component: EditUsersComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
