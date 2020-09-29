import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ContactServiceService {

  public apiUrl: string;
  public resource: string;
  
  constructor
  (
    private httpClient : HttpClient
  ) 
  { 
      this.apiUrl = environment.apiRest;
      this.resource = 'message';        
  }

  public saveMessage(email: string, message: string): Observable<any> {
    const path = ``;
    // let params = new HttpParams();

    // params = params.append('idUser', String(idUser));
    let body = { "email": email, "message": message};
    return this.httpClient.post(this.getFullPath() + path, body).pipe(
      map((res: any) => res)
    );
  }

  protected getFullPath() {
    return this.apiUrl + this.resource;
  }
}
