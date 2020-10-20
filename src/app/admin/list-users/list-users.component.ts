import { Component, OnInit } from '@angular/core';
import { IUser, User } from 'src/app/models/User.model';
import { UsersService } from 'src/app/services/Impl/users.service';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css'],
  providers: [MessageService]
})

export class ListUsersComponent implements OnInit {
  public users: IUser[] = [];
  public loading = false;
  constructor(private usersService: UsersService, private messageService: MessageService) { }

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.usersService.getUsers().pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((resp: IUser[]) => {
      this.loading = true;
      console.log(resp);
      this.users = resp;
    });
  }

  Delete (idUser: string) {
    console.log('Ingrese a eliminar');
    console.log(idUser);
    this.usersService.DeleteUser(idUser).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe(data => {
      this.loading = true;
      this.ngOnInit();
    });
  }
}
