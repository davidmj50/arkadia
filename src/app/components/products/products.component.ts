import { Component, OnInit, AfterContentChecked, OnDestroy } from '@angular/core';
import { ProductsService } from 'src/app/services/Impl/products.service';
import { finalize, filter } from 'rxjs/operators';
import { IProduct } from 'src/app/models/Product.model';
import { MessageService } from 'primeng/api';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css'],
  providers: [MessageService]
})

export class ProductsComponent implements OnInit, AfterContentChecked, OnDestroy {
  
  ngAfterContentChecked(): void {
    // let keyword = undefined;
    // this.routerActived.queryParams.subscribe(params => {
    //   keyword = params["search"];
    // });

    // if(keyword && this.keywordSearch && (keyword !== this.keywordSearch)){
    //   this.keywordSearch = keyword;
    //   console.log(keyword, this.keywordSearch);

    //   this.searchProducts();
    // }
    
  }

  private nameCategory : string = "";
  public loading: boolean = false;
  public products: IProduct[] = [];
  public idCategory: string;
  public keywordSearch: string;
  public isSearched: boolean = false;

  constructor(private productsService: ProductsService,
    private messageService: MessageService,
    private routerActived: ActivatedRoute,
    private router: Router,
    private _cartService: CartService) { 
      this.router.events.pipe(
        filter(event => event instanceof NavigationEnd)  
      ).subscribe((event: NavigationEnd) => {
        // console.log(event.url);
        this.getInfo();
      });
    }

  ngOnInit() {
    this.getInfo();
  }
  getInfo() {
    this.routerActived.queryParams.subscribe(params => {
      this.idCategory = params["idCategory"];
      this.keywordSearch = params["search"];
    });
    if(this.idCategory) {
      this.loadProductsByCategoryId();
    } else if(this.keywordSearch) {
      this.searchProducts();
      this.isSearched = true;
    } else {
      this.loadGeneralProducts();
    }
  }

  searchProducts() {
    this.productsService
      .getProductsSearching(this.keywordSearch)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (products: IProduct[]) => {
          this.loading = true;
          this.products = products;
          // console.log(this.products);
        },
        error => {
          this.messageService.add({severity:'error',summary:'Atención', detail:'Ha ocurrido un error al buscar los productos !'});
          console.log(error);
        }
      );
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
      this.messageService.add({severity: 'error', key: 'toastAdmin', summary: 'Atención',
      detail: 'Ha ocurrido un error al cargar los productos por categorias!'});
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

  public ngOnDestroy(): void {
  }
}
