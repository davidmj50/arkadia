import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { ProductsService } from 'src/app/services/Impl/products.service';
import { finalize } from 'rxjs/operators';
import { IProduct } from 'src/app/models/Product.model';
import { CartService } from 'src/app/services/cart.service';

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
    private _productService: ProductsService,
    private _cartService: CartService) {
     }

  ngOnInit() {
    
    this._activatedRoute.queryParams.subscribe(params => {
      this.idProduct = params['idProduct'];
      console.log('Producto: ', this.idProduct);
      this.getProductById();
    });
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
          // this.product.stock = 0;
          this.product.cantidad = this.product.stock == 0 ? 0 : 1;
          console.log(this.product);
        },
        error => {
          this.messageService.add({severity:'error',summary:'Atención', detail:'Ha ocurrido un error al cargar el producto!'});
          console.log(error);
        }
      );
  }

  addCart() {
    this._cartService.changeCart(this.product);
    this.messageService.add({severity:'success', summary:'Información', detail:'Producto agregado al carrito'});

  }

  public addQuantity() {
    if(this.product.stock == this.product.cantidad){
      this.messageService.add({severity:'error', summary:'El stock es insuficiente', detail:''});
    } else {
      this.product.cantidad++;
    }
  }

  reduceQuantity(){
    if(this.product.cantidad !== 1) {
      this.product.cantidad--;
    }
  }
  
}
