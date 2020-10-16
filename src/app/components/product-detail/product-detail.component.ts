import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css'],
  providers: [MessageService]
})
export class ProductDetailComponent implements OnInit {

  public idProduct: number;

  constructor(private _activatedRoute: ActivatedRoute,
    private _route: Router,
    private messageService: MessageService) { }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(params => {
      this.idProduct = params['idProduct'];
      console.log('Producto: ', this.idProduct);
    });
  }

  addCart() {
    this.messageService.add({severity:'success', summary:'Información', detail:'Producto agregado al carrito'});
    console.log("wewedwedwef");
  }

}
