import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { IContact } from 'src/app/models/Contact.model';
import { ContactService } from 'src/app/services/Impl/contact.service';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-attend-messages',
  templateUrl: './attend-messages.component.html',
  styleUrls: ['./attend-messages.component.css']
})
export class AttendMessagesComponent implements OnInit {

  public idMessage: string;
  public message: IContact;
  public loading = false;
  public formContact: FormGroup;

  constructor(private _contactService: ContactService,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private messageService: MessageService) { }

  ngOnInit() {
    this.formContact = this.formbuilder.group({
      atendido: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      mensaje: new FormControl('', Validators.required)
    });

    this.idMessage = this.route.snapshot.paramMap.get('id');
    this.getContact();
  }

  getContact() {
    this._contactService
      .getContactMessageById(this.idMessage)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (message: IContact) => {
          this.loading = true;
          this.message = message;
          console.log(message);
          this.formContact.setValue({
            atendido: this.message.atendido,
            email: this.message.eMail,
            mensaje: this.message.mensaje
          });
        },
        error => {
          this.messageService.add({severity: 'error', key: 'toastAdmin', summary: 'Antención',
          detail: 'Ha ocurrido un error al cargar la información del contacto!'});
          console.log(error);
        }
      );
  }

  setContact() {
    // console.log(this.message, this.formContact.get('atendido').value);
    this._contactService
    .updateStatus(this.message, 
      this.formContact.get('atendido').value,)
    .pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe(
      (contact: IContact) => {
        this.loading = true;
        this.message = contact;
        this.messageService.add({severity: 'success', key: 'toastAdmin', summary: 'Información',
        detail: 'Se actualizó la informacion correctamente!'});
      },
      error => {
        this.messageService.add({severity: 'error', key: 'toastAdmin', summary: 'Atención',
        detail: 'Ha ocurrido un error al editar!'});
        console.log(error);
      }
    );
  }

}
