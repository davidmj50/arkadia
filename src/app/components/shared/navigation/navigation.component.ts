import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, Inject, HostListener, AfterContentChecked, Input } from '@angular/core';
import { DOCUMENT } from '@angular/platform-browser';
import { CartService } from 'src/app/services/cart.service';
import { IUser } from 'src/app/models/User.model';
import { ProductsService } from 'src/app/services/Impl/products.service';
import { finalize } from 'rxjs/operators';
import { IProduct } from 'src/app/models/Product.model';
import { Router } from '@angular/router';

declare const $ : any;

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit, AfterViewInit, AfterContentChecked {

  public user: IUser;
  @Input()
  public pointsUser: number = 0;
  public loading: boolean;
  public products: IProduct[];

  public getInfoUser() {
    // console.log(localStorage.getItem("pointsUser"));
    this.user = JSON.parse(localStorage.getItem('userInfo'));
  }
  
  public numProducts: number = 0;

  ngAfterContentChecked(): void {
    if(this._cartService.getProductsCart()) {
      this.numProducts = this._cartService.getProductsCart().length;
    }
    this.pointsUser = parseInt(localStorage.getItem("pointsUser"));
    // this.getInfoUser();
  }
  
  ngAfterViewInit(): void {
    this.navBar.nativeElement.innerHTML;
  }

  @ViewChild('navFixed') navBar: ElementRef;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private _cartService: CartService,
    private productService: ProductsService,
    private router: Router,
    ) { 
      
    }

    // @HostListener('scroll', ['$event']) // for scroll events of the current element
  @HostListener('window:scroll', ['$event']) // for window scroll events
  onScroll(event) {
    // console.log(window.pageYOffset);
    if (window.pageYOffset > 65) {
      this.navBar.nativeElement.style.position = "fixed"
      this.navBar.nativeElement.style.top = "0";
      this.navBar.nativeElement.style.zIndex = "10";
      this.navBar.nativeElement.style.width = "100%"
    } else {
      this.navBar.nativeElement.style.position = "relative"
      this.navBar.nativeElement.style.width = "100%"
      this.navBar.nativeElement.style.top = "0";
      this.navBar.nativeElement.style.zIndex = "10";
    }
  }

  ngOnInit() {
    this.getInfoUser();
  }

  closeSession() {
    localStorage.removeItem("userInfo");
    localStorage.removeItem("pointsUser");
    this.user = null;
  }

  search(keyword: string) {
    this.router.navigate(['/products'], {queryParams: { search: keyword}});
  }
}
