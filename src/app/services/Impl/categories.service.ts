import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ICategory, Category } from 'src/app/models/Category.model';
import { IProduct } from 'src/app/models/Product.model';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService extends ServiceService<any>{
  
  constructor(private http: HttpClient) { 
    super();
    this.apiUrl = environment.apiRest;
    this.httpClient = http;
    this.resource = 'categorias';
  }

  public getCategories() : Observable<ICategory[]> {
    const path = ``;
    // let params = new HttpParams();
    // params = params.append('idCase', String(idCase));
    return this.executeGet(path).pipe(map((resp: ICategory[]) => resp));
  }

  public getCategory(idCategory: string) : Observable<ICategory> {
    const path = `/${idCategory}`;
    return this.executeGet(path).pipe(map((resp: ICategory) => resp));
  }

  public createCategory(name: string, description: string): Observable<ICategory> {
    let category: Category = new Category(name, description);
    return this.post(category, '').pipe(map((resp: ICategory) => resp));
  }

  public updateCategory(name: string, description: string, idCategory: string) : Observable<ICategory>{
    let category: Category = new Category(name, description);
    const path = `/${idCategory}`;
    return this.update(category, path).pipe(map((resp: ICategory) => resp));
  }
}
