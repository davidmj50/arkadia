import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProduct } from 'src/app/models/Product.model';
import { map } from 'rxjs/operators';
import { SaleDetail } from 'src/app/models/SaleDetail.model';
import { ISale } from 'src/app/models/Sale.model';

@Injectable({
  providedIn: 'root'
})
export class SalesDetailsService extends ServiceService<any>{
  
  constructor(private http: HttpClient) { 
    super();
    this.apiUrl = environment.apiRest;
    this.httpClient = http;
    this.resource = 'detalleventasaveall';
  }

  saveSaleDetails(venta: ISale, products: IProduct[]) {
    let details: SaleDetail[] = [];
    products.forEach((product) =>{
      details.push(new SaleDetail(product.cantidad, 0, 0, product.cantidad * product.precio, venta, product));
    });
    return this.post(details).pipe(map((resp: any) => resp));
  }
}
