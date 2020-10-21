import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { IProduct } from 'src/app/models/Product.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProductsService extends ServiceService<IProduct>{
  
  
  public getProduct(idProduct: number) {
    const path = `/${idProduct}`;
    return this.executeGet(path).pipe(map((resp: IProduct) => resp));
  }

  constructor(private http: HttpClient) { 
    super();
    this.apiUrl = environment.apiRest;
    this.httpClient = http;
    this.resource = 'producto';
  }

  public getProducts() : Observable<IProduct[]> {
    const path = ``;
    // let params = new HttpParams();
    // params = params.append('idCase', String(idCase));
    return this.executeGet(path).pipe(map((resp: IProduct[]) => resp));
  }

  public getProductsByCategoryId(idCategory: string): Observable<IProduct[]> {
    const path = `/prodcategoria/${idCategory}`;
    return this.executeGet(path).pipe(map((resp: IProduct[]) => resp));
  }

  public getProductsSearching(keyword: string) {
    const path = `/producsearch/${keyword}`;
    return this.executeGet(path).pipe(map((resp: IProduct[]) => resp));
  }
}
