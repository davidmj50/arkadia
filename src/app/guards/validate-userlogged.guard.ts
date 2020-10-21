import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { IUser } from '../models/User.model';

@Injectable({
  providedIn: 'root'
})
export class ValidateUserloggedGuard implements CanActivate {
  canActivate(): Observable<boolean> | Promise<boolean> | boolean {
    let userLogged: IUser = JSON.parse(localStorage.getItem("userInfo"));
    if(userLogged && userLogged.rol.id_rol == 1) {
      return true;
    }
    return false;
  }
}
