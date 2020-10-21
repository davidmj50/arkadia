import { Component, OnInit } from '@angular/core';
import { ContactService } from 'src/app/services/Impl/contact.service';
import { MessageService } from 'primeng/api';
import { finalize } from 'rxjs/operators';
import { IContact } from 'src/app/models/Contact.model';

@Component({
  selector: 'app-admin-messages',
  templateUrl: './admin-messages.component.html',
  styleUrls: ['./admin-messages.component.css']
})
export class AdminMessagesComponent implements OnInit {
  
  public loading: boolean;
  public contactMessages: IContact[] = [];

  constructor(private contactService: ContactService,
    private messageService: MessageService) { }

  ngOnInit() {
    this.loadContactMessages();
  }

  loadContactMessages() {
    this.contactService.getContactMessages().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((resp: IContact[]) => {
      this.loading = true;
      this.contactMessages = resp;
    }, error => {
      this.messageService.add({severity:'error', key: 'toastAdmin',summary:'Atención', detail:'Ha ocurrido un error al cargar los mensajes:contactos!'});
    });
  }

}
