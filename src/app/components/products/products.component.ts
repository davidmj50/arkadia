import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/Impl/products.service';
import { finalize } from 'rxjs/operators';
import { IProduct } from 'src/app/models/Product.model';
import { MessageService } from 'primeng/api';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [MessageService]
})

export class ProductsComponent implements OnInit {

  private nameCategory : string = "";
  public loading: boolean = false;
  public products: IProduct[] = [];
  public idCategory: string;

  constructor(private productsService: ProductsService,
    private messageService: MessageService,
    private router: ActivatedRoute) { }

  ngOnInit() {
    this.router.queryParams.subscribe(params => {
      this.idCategory = params["idCategory"];
    });
    this.loadProductsByCategoryId();
  }

  public loadProductsByCategoryId() {
    this.productsService.getProductsByCategoryId(this.idCategory).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((resp : IProduct[]) => {
      this.loading = true;
      this.products = resp;
      console.log(resp);
    }, error => {
      this.messageService.add({severity: 'error', key: 'toastAdmin', summary: 'Atención',
      detail: 'Ha ocurrido un error al cargar los productos por categorias!'});
    });
  }
}
