import { Component, OnInit, Input, AfterContentChecked } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { IItem } from 'src/app/models/Item.model';
import { IProduct } from 'src/app/models/Product.model';

@Component({
  selector: 'app-modal-shopping-cart',
  templateUrl: './modal-shopping-cart.component.html',
  styleUrls: ['./modal-shopping-cart.component.css']
})
export class ModalShoppingCartComponent implements OnInit, AfterContentChecked {

  public numbers: number[];

  ngAfterContentChecked(): void {
    this.items = this._cartService.getProductsCart();
  }

  ngDoCheck(): void {
    
  }

  @Input()
  public items: IProduct[] = []; 

  ngOnInit(): void {
  }
  
  constructor(private _cartService: CartService) { }

  public setQuantity(item: IProduct) {
    // item.cantidad = 
    console.log(item);
  }

  public removeItem(producto: IProduct, e: any){
    this._cartService.removeElementCart(producto);
    this.items = this._cartService.getProductsCart();
    this.items.length
    console.log(e);
  }

}
