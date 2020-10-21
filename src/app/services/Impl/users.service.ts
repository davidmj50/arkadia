import { Injectable } from '@angular/core';
import { ServiceService } from '../service.service';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser, User } from 'src/app/models/User.model';
import { IRole, Role } from 'src/app/models/Role.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService extends ServiceService<any> {
  
  
  public validateUser(username: any, password: any): Observable<any> {
    return this.executeGet(`/login/${username}/${password}`).pipe(map((resp: IUser) => resp));
  }

  constructor(private http: HttpClient) {
    super();
    this.apiUrl = environment.apiRest;
    this.httpClient = http;
    this.resource = 'usuario';
  }

  public getUsers(): Observable<IUser[]> {
    const path = ``;
    // let params = new HttpParams();
    // params = params.append('idCase', String(idCase));
    return this.executeGet(path).pipe(map((resp: IUser[]) => resp));
  }

  public getUser(idUser: string): Observable<IUser> {
    const path = `/${idUser}`;
    return this.executeGet(path).pipe(map((resp: IUser) => resp));
  }

  public createUser(
    eMail: string,
    userName: string,
    nombre: string,
    apellido: string,
    password: string,
    direccion: string,
    telefono: string,
    fecha_Nacimiento: Date ): Observable<IUser> {
    const user: User = new User(
      eMail,
      userName,
      nombre,
      apellido,
      password,
      direccion,
      telefono,
      fecha_Nacimiento.toISOString(),
      1);
    return this.post(user, '').pipe(map((resp: IUser) => resp));
  }

  public updateUser(
    eMail: string,
    userName: string,
    nombre: string,
    apellido: string,
    password: string,
    direccion: string,
    telefono: string,
    fecha_Nacimiento: Date,
    idUser: string,
    idRole: number,

  ): Observable<IUser> {
    let user: User = new User(
      eMail,
      password,
      userName,
      nombre,
      apellido,
      direccion,
      telefono,
      fecha_Nacimiento.toISOString(),
      idRole
    );
    const path = `/${idUser}`;
    console.log(user);
    return this.update(user, path).pipe(map((resp: IUser) => resp));
  }
  
  public createUserCLient(email: string,
    userName: string,
    nombre: string,
    apellido: string,
    password: string,
    direccion: string,
    telefono: string,
    fecha_Nacimiento: string) : Observable<any> {
    let userModel: User = new User (email, password, userName, nombre, apellido ,direccion, telefono, fecha_Nacimiento, 2);
    console.log(userModel);
    return this.post(userModel,'');
  }

}

