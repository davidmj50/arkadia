import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/services/Impl/users.service';
import { Router } from '@angular/router';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { finalize } from 'rxjs/operators';
import { MessageService } from 'primeng/api';
import { IUser } from 'src/app/models/User.model';
import { PointsUserService } from 'src/app/services/Impl/points-user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public formLogin: FormGroup;
  loading: boolean;
  public pointsUser: number;

  constructor(private userService: UsersService, 
    private router: Router,
    private formbuilder: FormBuilder,
    private messageService: MessageService,
    private pointsUserService : PointsUserService) { }

  ngOnInit() {
    this.formLogin = this.formbuilder.group({
      username: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    
    this.userService.validateUser(this.formLogin.get('username').value,
    this.formLogin.get('password').value).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((result) => {
      this.loading = true;
      let userlogged: IUser = result;
      localStorage.setItem("userInfo",JSON.stringify(userlogged));
      if(userlogged.rol.id_rol == 1){
        this.router.navigate(['/dashboard/admin']);
      } else{
        this.getPointsUser(userlogged.id_Usuario);
        this.router.navigate(['/home']);
      }
    }, error => {
      if(error["status"] == 404) {
        
        this.messageService.add({severity:'error', key: 'toastAdmin',summary:'Atención', detail:'El usuario y/o la contraseña es incorrecto'});
      } else {
        this.messageService.add({severity:'error', key: 'toastAdmin',summary:'Atención', detail:'Ha ocurrido un error al iniciar sesión!'});
      }
      
    });
  }

  getPointsUser(idUser: number) {
    this.pointsUserService.getPoints(idUser.toString()).pipe(
      finalize(() => {
        this.loading = false;
      })
    ).subscribe((result) => {
      this.loading = true;
      this.pointsUser = result;
      localStorage.setItem("pointsUser", this.pointsUser.toString());
    }, error => {
      this.messageService.add({severity:'error', key: 'toastAdmin',summary:'Atención', detail:'Hubo un error al consultar los puntos del usuario.'});
    });
  }
}
