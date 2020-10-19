import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import * as _ from 'lodash';


export class ServiceService<T> {
  public httpClient: HttpClient;
  public apiUrl: string;
  public resource: string;

  constructor() {}

  public get(id: string, path?: string): Observable<T> {
    return this.httpClient.get(this.getFullPath() + path + id).pipe(
        map((res: any) => res)
      );
  }

  public getParams(path: string, parameters: HttpParams): Observable<T> {
    return this.httpClient.get(this.getFullPath() + path, {  params: parameters }).pipe(
        map((res: any) => res)
      );
  }

  public save(data: any): Observable<number> {
    return this.httpClient.post(this.getFullPath(), data).pipe(
        map((res: any) => res)
      );
  }

  public update(data: any, path?: string): Observable<any> {
    return this.httpClient.put(this.getFullPath() + path, data).pipe(
        map((res: any) => res)
      );
  }

  public delete(id: string): Observable<string> {
    return this.httpClient.delete(this.getFullPath() + id).pipe(
        map((res: any) => res)
      );
  }

  public post(data: any, path?: string): Observable<any> {
    if (!path) {
      path = '';
    }
    return this.httpClient.post(this.getFullPath() + path, data).pipe(
        map((res: any) => res)
      );
  }

  public executeGet(path: string): Observable<any> {
    return this.httpClient.get(this.getFullPath() + path).pipe(
      map((res: any) => res)
    );
  }

  public executePost(path: string, body: any, options: any): Observable<any> {
    if (!path) {
      path = '';
    }
    if (!options) {
      return this.httpClient.post(this.getFullPath() + path, body).pipe(
        map((res: any) => res)
      );
    } else {
      return this.httpClient.post(this.getFullPath() + path, body, options).pipe(
        map((res: any) => res)
      );
    }
  }

  public executeDelete(path: string): Observable<any> {
    return this.httpClient.delete(this.getFullPath() + path).pipe(
        map((res: any) => res)
      );
  }

  protected getFullPath() {
    return this.apiUrl + this.resource;
  }
}
