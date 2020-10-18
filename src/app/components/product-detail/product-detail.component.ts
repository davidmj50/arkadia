import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductsService } from 'src/app/services/Impl/products.service';
import { finalize } from 'rxjs/operators';
import { IProduct } from 'src/app/models/Product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [MessageService]
})
export class ProductDetailComponent implements OnInit {

  public idProduct: number;
  public loading: boolean;
  public product: IProduct;
  public numbers: number[];

  constructor(private _activatedRoute: ActivatedRoute,
    private _route: Router,
    private messageService: MessageService,
    private _productService: ProductsService) { }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(params => {
      this.idProduct = params['idProduct'];
      console.log('Producto: ', this.idProduct);
    });
    this.getProductById();
  }

  getProductById() {
    this._productService
      .getProduct(this.idProduct)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (product: IProduct) => {
          this.loading = true;
          this.product = product;
          this.numbers = new Array(product.stock).fill(product.stock).map((x,i)=>i + 1); 
          console.log(this.numbers);
        },
        error => {
          this.messageService.add({severity:'error', key: 'toastAdmin',summary:'Antención', detail:'Ha ocurrido un error al cargar el producto!'});
          console.log(error);
        }
      );
  }

  addCart() {
    this.messageService.add({severity:'success', summary:'Información', detail:'Producto agregado al carrito'});

  }

}
