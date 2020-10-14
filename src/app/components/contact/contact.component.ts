import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { ContactService } from 'src/app/services/Impl/contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  public contactForm: FormGroup;

  constructor
  (
    private contactService: ContactService
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
