import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ContactServiceService } from 'src/app/services/contact-service.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public contactForm: FormGroup;

  constructor
  (
    private contactService: ContactServiceService
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
      ).subscribe((resp: any) => {
        console.log(resp);
      },
      error => {
        console.log(error.error);
      });
    } else {
      alert('Debe ingresar todos los campos');
    }
    
    

  }
}
