import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { UsersService } from 'src/app/services/Impl/users.service';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-add-users',
  templateUrl: './add-users.component.html',
  styleUrls: ['./add-users.component.css'],
  providers: [MessageService]
})
export class AddUsersComponent implements OnInit {

  public formUsers: FormGroup;
  public loading = false;

  constructor(
    private router: Router,
    private service: UsersService,
    private formbuilder: FormBuilder,
    private messageService: MessageService
  ) { }

  ngOnInit() {
    this.formUsers = this.formbuilder.group({
      userName: new FormControl('', Validators.required),
      nombre: new FormControl('', Validators.required),
      apellido: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      direccion: new FormControl('', Validators.required),
      telefono: new FormControl('', Validators.required),
      fecha_Nacimiento: new FormControl('', Validators.required)
    });
  }

  Guardar() {
    this.service.createUser(
      this.formUsers.get('email').value,
      this.formUsers.get('userName').value,
      this.formUsers.get('nombre').value,
      this.formUsers.get('apellido').value,
      this.formUsers.get('password').value,
      this.formUsers.get('direccion').value,
      this.formUsers.get('telefono').value,
      this.formUsers.get('fecha_Nacimiento').value
      ).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((result) => {
      this.loading = true;
      this.messageService.add({severity: 'success', key: 'toastAdmin', summary: 'Información',
      detail: 'El usuario se ha agregado correctamente!'});
      //this.router.navigate(['/dashboard/admin/categories']);
    }, error => {
      this.messageService.add({severity: 'error', key: 'toastAdmin', summary: 'Antención',
      detail: 'Ha ocurrido un error al guardar!'});
    });
  }
}
