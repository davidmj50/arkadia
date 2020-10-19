import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/Impl/users.service';
import { ActivatedRoute } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { IUser } from 'src/app/models/User.model';
import {
  FormGroup,
  Validators,
  FormControl,
  FormBuilder
} from '@angular/forms';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-edit-users',
  templateUrl: './edit-users.component.html',
  styleUrls: ['./edit-users.component.css'],
  providers: [MessageService]
})
export class EditUsersComponent implements OnInit {
  public idUser: string;
  public user: IUser;
  public loading = false;
  public formUsers: FormGroup;

  constructor(
    private _userservice: UsersService,
    private route: ActivatedRoute,
    private formbuilder: FormBuilder,
    private messageService: MessageService) { }

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
    this.idUser = this.route.snapshot.paramMap.get('id');
    this.getUser();
  }

  getUser() {
    this._userservice.getUser(this.idUser)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (user: IUser) => {
          this.loading = true;
          this.user = user;
          this.formUsers.setValue({
            userName: this.user.userName,
            nombre: this.user.nombre
           
          });
        },
        error => {
          this.messageService.add({severity: 'error', key: 'toastAdmin', summary: 'Antención',
          detail: 'Ha ocurrido un error al cargar el usuario!'});
          console.log(error);
        }
      );
  }

  updateUser() {
    this._userservice.updateUser(
      this.formUsers.get('email').value,
      this.formUsers.get('userName').value,
      this.formUsers.get('nombre').value,
      this.formUsers.get('apellido').value,
      this.formUsers.get('password').value,
      this.formUsers.get('direccion').value,
      this.formUsers.get('telefono').value,
      this.formUsers.get('fecha_Nacimiento').value,
      this.idUser)
    .pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe(
      (user: IUser) => {
        this.loading = true;
        this.user = user;
        this.messageService.add({severity: 'success', key: 'toastAdmin', summary: 'Información',
        detail: 'El usuario se ha editado correctamente!'});
      },
      error => {
        this.messageService.add({severity: 'error', key: 'toastAdmin', summary: 'Antención',
        detail: 'Ha ocurrido un error al editar!'});
        console.log(error);
      }
    );
  }

}
