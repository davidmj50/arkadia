import { Component, OnInit, DoCheck, AfterContentChecked, Input } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';
import { IProduct } from 'src/app/models/Product.model';
import { MessageService } from 'primeng/api';

declare const $: any;

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css'],
  providers: [MessageService]
})
export class ShoppingCartComponent implements OnInit, AfterContentChecked {
  
  public totalPago: number = 0;

  ngAfterContentChecked(): void {
    this.items = this._cartService.getProductsCart();
  }

  ngDoCheck(): void {
    
  }

  @Input()
  public items: IProduct[] = []; 

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.items = this._cartService.getProductsCart();
    this.validarCarrito();
    this.calculatePrice();
  }
  calculatePrice() {
    this.totalPago = 0;
    this.items.forEach(element => {
      this.totalPago += element.precio * element.cantidad;
    });
  }
  
  constructor(private _cartService: CartService, 
    private router: Router,
    private messageService: MessageService) { }

  public setQuantity(item) {
    console.log(item);
  }

  public removeItem(producto: IProduct, e: any){
    this._cartService.removeElementCart(producto);
    this.items = this._cartService.getProductsCart();
    this.items.length;
    console.log(e);
    this.validarCarrito();
    this.calculatePrice();
  }

  validarCarrito(): void {
    if(!this.items || this.items.length == 0) {
      this.router.navigate(['/home']);
    }
  };

  public addQuantity(product: IProduct) {
    if(product.stock == product.cantidad){
      this.messageService.add({severity:'error', summary:'El stock es insuficiente', detail:''});
    } else {
      product.cantidad++;
      this.calculatePrice();
    }
  }

  reduceQuantity(product: IProduct) {
    if(product.cantidad !== 1) {
      product.cantidad--;
      this.calculatePrice();
    }
  }

  public purchase() {
    if(localStorage.getItem("userInfo")){
      this.router.navigate(['/purchase']);
    } else {
      $('.bd-purchasing-modal-lg').modal({
        show: true
      });
    }
    // $(idModal).modal('hide');
  }
}
