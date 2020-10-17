import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser, User } from 'src/app/models/User.model';
import { IRole } from 'src/app/models/Role.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ServiceService<any> {

  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiRest;
    this.httpClient = http;
    this.resource = 'usuario';
  }

  public getUsers(): Observable<IUser[]> {
    const path = ``;
    // let params = new HttpParams();
    // params = params.append('idCase', String(idCase));
    return this.executeGet(path).pipe(map((resp: IUser[]) => resp));
  }
}
