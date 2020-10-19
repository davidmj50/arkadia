import { IRole, Role } from "./Role.model";

export interface IUser {
    id?: number;
    eMail: string;
    password: string;
    userName: string;
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
    fecha_Nacimiento: string;
    rol: IRole;
}

export class User {
    id?: number;
    eMail: string;
    password: string;
    userName: string;
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
    fecha_Nacimiento: string;
    // id_rol: number;
    rol: Role;

    constructor(email: string,
        password: string,
        userName: string,
        nombre: string,
        apellido: string,
        direccion: string,
        telefono: string,
        fecha_Nacimiento: string,
        idRole: number) {
          this.eMail = email;
          this.password = password;
          this.userName = userName;
          this.nombre = nombre;
          this.apellido = apellido;
          this.direccion = direccion;
          this.telefono = telefono;
          this.fecha_Nacimiento = fecha_Nacimiento;
          this.rol = new Role(idRole, "");
    }
}
