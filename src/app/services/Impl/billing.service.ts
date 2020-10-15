import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ServiceService } from '../service.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BillingService extends ServiceService<any>{

  constructor(private http: HttpClient) { 
    super();
    this.apiUrl = environment.apiRest;
    this.httpClient = http;
    this.resource = 'contacto/';
  }
}
