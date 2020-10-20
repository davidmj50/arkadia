import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/Impl/products.service';
import { finalize } from 'rxjs/operators';
import { IProduct } from 'src/app/models/Product.model';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

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
    private routerActived: ActivatedRoute,
    private router: Router,
    private _cartService: CartService) { }

  ngOnInit() {
    this.routerActived.queryParams.subscribe(params => {
      this.idCategory = params["idCategory"];
    });
    if(this.idCategory) {
      this.loadProductsByCategoryId();
    } else {
      this.loadGeneralProducts();
    }
  }
  loadGeneralProducts() {
    this.productsService.getProducts().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((resp : IProduct[]) => {
      this.loading = true;
      this.products = resp;
    }, error => {
      this.messageService.add({severity:'error', key: 'toastAdmin',summary:'Atención', detail:'Ha ocurrido un error al cargar los productos por categorias!'});
    });
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
      this.messageService.add({severity:'error', key: 'toastAdmin',summary:'Atención', detail:'Ha ocurrido un error al cargar los productos por categorias!'});
    });
  }

  public addCart(product: IProduct) {
    product.cantidad = 1;
    this._cartService.changeCart(product);
    this.messageService.add({severity:'success', key: 'toastAdmin',summary:'', detail:'Se ha agregado el producto al carrito'});
  }

  public viewProduct(idProducto: string) {
    this.router.navigate(["productDetail"], {
      queryParams: { idProduct: idProducto },
      skipLocationChange: false
    });
    window.scrollTo(0, 0);
  }
}
