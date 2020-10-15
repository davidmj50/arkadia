import { Component, OnInit, DoCheck, AfterContentChecked, Input } from '@angular/core';
import { IItem } from 'src/app/models/Item.model';
import { CartService } from 'src/app/services/cart.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, AfterContentChecked {
  
  public totalPago: number = 0;

  ngAfterContentChecked(): void {
    this.items = this._cartService.getProductsCart();
  }

  ngDoCheck(): void {
    
  }

  @Input()
  public items: IItem[]; 

  ngOnInit(): void {
    window.scrollTo(0, 0);
    this.items = this._cartService.getProductsCart();
    this.validarCarrito();
    this.items.forEach(element => {
      this.totalPago += element.price * element.quantity;
  });
  }
  
  constructor(private _cartService: CartService, private router: Router) { }

  public setQuantity(item) {
    console.log(item);
  }

  public removeItem(producto: IItem, e: any){
    this._cartService.removeElementCart(producto);
    this.items = this._cartService.getProductsCart();
    this.items.length;
    console.log(e);
    this.validarCarrito();
  }

  validarCarrito(): void {
    if(!this.items || this.items.length == 0) {
      this.router.navigate(['/home']);
    }
  };
}
