import { Component, OnInit } from '@angular/core';
import { IProduct } from 'src/app/models/Product.model';
import { ProductsService } from 'src/app/services/Impl/products.service';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-products',
  templateUrl: './list-products.component.html',
  styleUrls: ['./list-products.component.css'],
  providers: [MessageService]
})
export class ListProductsComponent implements OnInit {
  public products: IProduct[] = [];
  public loading = false;
  constructor(private productsService: ProductsService, private messageService: MessageService) { }

  ngOnInit() {
    this.loadProducts();
  }

  loadProducts() {
    this.productsService.getProducts().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((resp: IProduct[]) => {
      this.loading = true;
      console.log(resp);
      this.products = resp;
    }, error => {
      this.messageService.add({severity: 'error', key: 'toastAdmin', summary: 'Antención',
      detail: 'Ha ocurrido un error al cargar los usuarios!'});
    });
  }

  Delete (IdProduct: string) {
    console.log('Ingrese a eliminar');
    console.log(IdProduct);
    this.productsService.DeleteProduct(IdProduct).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(data => {
      this.messageService.add({severity: 'success', key: 'toastAdmin', summary: 'Información',
      detail: 'El producto se ha eliminado correctamente!'});
      this.loading = true;
      this.ngOnInit();
    },
    error => {
      this.messageService.add({severity: 'error', key: 'toastAdmin', summary: 'Antención',
      detail: 'Ha ocurrido un error al eliminar!'});
      console.log(error);
    }
    );
  }
}
