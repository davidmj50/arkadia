import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AddProductsComponent } from './add-products/add-products.component';
import { ListProductsComponent } from './list-products/list-products.component';
import { EditProductsComponent } from './edit-products/edit-products.component';
import { ListCategoriesComponent } from './list-categories/list-categories.component';
import { EditCategoriesComponent } from './edit-categories/edit-categories.component';
import { AddCategoriesComponent } from './add-categories/add-categories.component';

const routes: Routes = [
  { path: 'addProducts', component: AddProductsComponent },
  { path: 'products', component: ListProductsComponent },
  { path: 'editProducts', component: EditProductsComponent },
  { path: 'addCategories', component: AddCategoriesComponent },
  { path: 'categories', component: ListCategoriesComponent },
  { path: 'editCategories/:id', component: EditCategoriesComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
