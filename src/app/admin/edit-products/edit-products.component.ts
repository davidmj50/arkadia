import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/Impl/products.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { IProduct } from 'src/app/models/Product2.model';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { MessageService } from 'primeng/api';
import { CategoriesService } from 'src/app/services/Impl/categories.service';
import { ICategory, Category } from 'src/app/models/Category.model';

@Component({
  selector: 'app-edit-products',
  templateUrl: './edit-products.component.html',
  styleUrls: ['./edit-products.component.css'],
  providers: [MessageService]
})
export class EditProductsComponent implements OnInit {
  public idProduct: string;
  public product: IProduct;
  public loading = false;
  public formProduct: FormGroup;
  public categories: ICategory[] = [];
  constructor(
    private service: ProductsService,
    private categoryservice: CategoriesService,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private messageService: MessageService,
  ) { }

  ngOnInit() {
    this.loadCategories();
    this.formProduct = this.formbuilder.group({
      producName: new FormControl('', Validators.required),
      descripcion: new FormControl('', Validators.required),
      precio: new FormControl('', [Validators.required, Validators.min(1)]),
      stock: new FormControl('', [Validators.required, Validators.min(0)]),
      imagen: new FormControl('', Validators.required),
    });
    this.idProduct = this.route.snapshot.paramMap.get('id');
    this.getProduct();
  }

  getProduct() {
    this.service.GetProduct(this.idProduct)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (product: IProduct) => {
          this.loading = true;
          this.product = product;
          console.log(this.product);
          this.formProduct.setValue({
            producName:      this.product.nombre_Producto,
            descripcion:     this.product.descripcion,
            precio:          this.product.precio,
            stock:           this.product.stock,
            imagen:          this.product.imagen
          });
        },
        error => {
          this.messageService.add({severity: 'error', key: 'toastAdmin', summary: 'Atención',
          detail: 'Ha ocurrido un error al cargar el usuario!'});
          console.log(error);
        }
      );
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

  updateProduct() {
    console.log( this.product.categoria.id,)
    this.service.updateProduct(
      this.formProduct.get('producName').value,
      this.formProduct.get('descripcion').value,
      this.formProduct.get('precio').value,
      this.formProduct.get('stock').value,
      this.formProduct.get('imagen').value,
      this.product.categoria.id_Categoria,
      this.idProduct,
      )
    .pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe(
      (product: IProduct) => {
        this.loading = true;
        this.product = product;
        this.messageService.add({severity: 'success', key: 'toastAdmin', summary: 'Información',
        detail: 'el producto se ha editado correctamente!'});
      },
      error => {
        this.messageService.add({severity: 'error', key: 'toastAdmin', summary: 'Atención',
        detail: 'Ha ocurrido un error al editar!'});
        console.log(error);
      }
    );
  }
}
