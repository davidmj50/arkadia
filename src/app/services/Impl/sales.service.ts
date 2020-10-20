import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProduct } from 'src/app/models/Product.model';
import { Sale, ISale } from 'src/app/models/Sale.model';
import { map } from 'rxjs/operators';
import { User, IUser } from 'src/app/models/User.model';

@Injectable({
  providedIn: 'root'
})
export class SalesService extends ServiceService<any>{
  
  constructor(private http: HttpClient) { 
    super();
    this.apiUrl = environment.apiRest;
    this.httpClient = http;
    this.resource = 'venta';
  }

  savePurchase(usuario: IUser, totalAmount: number, datePurchase: Date, comprobante: string) {
    let purchase: Sale = new Sale(null, comprobante, datePurchase, totalAmount, usuario);
    return this.save(purchase).pipe(map((resp: ISale) => resp));
  }
}
