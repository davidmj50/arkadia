import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PointsUserService extends ServiceService<any>{

  constructor(private http: HttpClient) { 
    super();
    this.apiUrl = environment.apiRest;
    this.httpClient = http;
    this.resource = 'cuentaspuntos/';
  } 

  public getPoints(idUser: string) : Observable<number> {
    const path = `${idUser}`;
    return this.executeGet(path).pipe(map((resp: number) => resp));;
  }
}
