import { IRole } from "./Role.model";

export interface IUser {
    id?: number;
    eMail: string;
    password: string;
    userName: string;
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
    fecha_Nacimiento: Date;
    id_rol: number;
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
    fecha_Nacimiento: Date;
    id_rol: number;

    constructor(eMail: string,
        password: string,
        userName: string,
        nombre: string,
        apellido: string,
        direccion: string,
        telefono: string,
        fecha_Nacimiento: Date,
        id_rol: number) {
          this.eMail = eMail;
          this.password = password;
          this.userName = userName;
          this.nombre = nombre;
          this.apellido = apellido;
          this.direccion = direccion;
          this.telefono = telefono;
          this.fecha_Nacimiento = fecha_Nacimiento;
          this.id_rol = id_rol;
    }
}
