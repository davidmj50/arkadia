import { Component, OnInit, DoCheck, AfterContentChecked, Input } from '@angular/core';
import { IItem } from 'src/app/models/Item.model';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit, AfterContentChecked {
  
  ngAfterContentChecked(): void {
    this.items = this._cartService.getProductsCart();
  }

  ngDoCheck(): void {
    
  }

  @Input()
  public items: IItem[]; 

  ngOnInit(): void {
  }
  
  constructor(private _cartService: CartService) { }

  public setQuantity(item) {
    console.log(item);
  }

  public removeItem(producto: IItem, e: any){
    this._cartService.removeElementCart(producto);
    this.items = this._cartService.getProductsCart();
    this.items.length
    console.log(e);
  }
}
