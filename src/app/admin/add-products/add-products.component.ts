import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { ProductsService } from 'src/app/services/Impl/products.service';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { CategoriesService } from 'src/app/services/Impl/categories.service';
import { ICategory, Category } from 'src/app/models/Category.model';

@Component({
  selector: 'app-add-products',
  templateUrl: './add-products.component.html',
  styleUrls: ['./add-products.component.css'],
  providers: [MessageService]
})
export class AddProductsComponent implements OnInit {

  public formProduct: FormGroup;
  public loading = false;
  public categories: ICategory[] = [];
  public selected: any;

  constructor(
    private router: Router,
    private service: ProductsService,
    private formbuilder: FormBuilder,
    private messageService: MessageService,
    private categoryservice: CategoriesService,
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.formProduct = this.formbuilder.group({
      producName: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      precio: new FormControl('', [Validators.required, Validators.min(1)]),
      stock: new FormControl('', [ Validators.required, Validators.min(0)]),
      imagen: new FormControl('', Validators.required),
    });
  }

  Guardar() {
    this. selected = this.formProduct.get('category').value;
    this.service.createProduct(
      this.formProduct.get('producName').value,
      this.formProduct.get('descripcion').value,
      this.formProduct.get('precio').value,
      this.formProduct.get('stock').value,
      this.formProduct.get('imagen').value,
      this.formProduct.get('category').value
      ).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((result) => {
      this.loading = true;
      console.log(this.formProduct.get('category').value);
      this.messageService.add({severity: 'success', key: 'toastAdmin', summary: 'Información',
      detail: 'el producto se ha agregado correctamente!'});
      // this.router.navigate(['/dashboard/admin/categories']);
    }, error => {
      this.messageService.add({severity: 'error', key: 'toastAdmin', summary: 'Atención',
      detail: 'Ha ocurrido un error al guardar!'});
    });
  }

  public loadCategories() {
    this.categoryservice.getCategories().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((resp: ICategory[]) => {
      this.loading = true;
      this.categories = resp;
    }, error => {
      this.messageService.add({severity: 'error', key: 'toastAdmin', summary: 'Atención',
      detail: 'Ha ocurrido un error al cargar las categorias!'});
    });
  }


}
