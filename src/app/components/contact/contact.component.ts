import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ContactService } from 'src/app/services/Impl/contact.service';
import { MessageService } from 'primeng/api';
import { IContact } from 'src/app/models/Contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [MessageService]
})
export class ContactComponent implements OnInit {

  public contactForm: FormGroup;

  constructor
  (
    private contactService: ContactService,
    private messageService: MessageService
  ) 
  { 
    this.contactForm = new FormGroup({
      email: new FormControl('', Validators.required),
      message: new FormControl('', Validators.required)
    });
  }

  ngOnInit() {
  }

  public enviarMensaje(){
    if(this.contactForm.valid){
      let email = this.contactForm.get('email').value;
      let message = this.contactForm.get('message').value;
      this.contactService.saveMessage(email,  message)
      .pipe(
        finalize(() => {
        })
      ).subscribe((resp: IContact) => {
        if(resp.id > 0){
          this.messageService.add({severity:'success', key: 'toastAdmin',summary:'Mensaje enviado exitosamente!', detail:''});
        }
      },
      error => {
        this.messageService.add({severity:'success', key: 'toastAdmin',summary:'Hubo un error al enviar el mensaje', detail:''});
      });
    } else {
    }
    
    

  }
}
