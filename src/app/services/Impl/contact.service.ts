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
    return this.post(contactModel, '').pipe(map((resp: IContact) => resp));
  }

  public getContactMessages() : Observable<IContact[]>  {
    return this.executeGet('').pipe(map((resp: IContact[]) => resp));
  }

  public getContactMessageById(idMessage: string): Observable<IContact>  {
    let path = `/${idMessage}`;
    return this.executeGet(path).pipe(map((resp: IContact) => resp));
  }

  public updateStatus(message: IContact, value: boolean) {
    let contactModel : Contact = new Contact (message.id, message.eMail, message.mensaje, value);
    let path = `/${message.id}`;
    return this.update(contactModel, path).pipe(map((resp: IContact) => resp));
  }
}
