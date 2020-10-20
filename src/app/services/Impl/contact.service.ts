import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Contact, IContact } from 'src/app/models/Contact.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ContactService extends ServiceService<any>{
  
  constructor(private http: HttpClient) { 
    super();
    this.apiUrl = environment.apiRest;
    this.httpClient = http;
    this.resource = 'contactenos/';
  }

  public saveMessage(email: string, message: string) : Observable<IContact> {
    let contactModel:Contact= new Contact (null, email, message, null);
    return this.post(contactModel, '').pipe(map((resp: IContact) => resp));;
  }
}
