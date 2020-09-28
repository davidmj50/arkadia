import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  public idProduct: number;

  constructor(private _activatedRoute: ActivatedRoute,
    private _route: Router) { }

  ngOnInit() {
    this._activatedRoute.queryParams.subscribe(params => {
      this.idProduct = params['idProduct'];
      console.log('Producto: ', this.idProduct);
    });
  }

}
