import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { IItem } from 'src/app/models/Item.model';

@Component({
  selector: 'app-modal-shopping-cart',
  templateUrl: './modal-shopping-cart.component.html',
  styleUrls: ['./modal-shopping-cart.component.css']
})
export class ModalShoppingCartComponent implements OnInit, AfterContentChecked {

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
