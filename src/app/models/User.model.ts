export interface IUser {
    id_Usuario: number;
    email: string;
    password: string;
    username: string;
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
    fecha_Nacimiento: Date;
    id_rol: number;
}

export class User {
    id_Usuario: number;
    email: string;
    password: string;
    username: string;
    nombre: string;
    apellido: string;
    direccion: string;
    telefono: string;
    fecha_Nacimiento: Date;
    id_rol: number;

    constructor(email: string,
        password: string,
        username: string,
        nombre: string,
        apellido: string,
        direccion: string,
        telefono: string,
        fecha_Nacimiento: Date,
        id_rol: number) {
          this.email = email;
          this.password = password;
          this.username = username;
          this.nombre = nombre;
          this.apellido = apellido;
          this.direccion = direccion;
          this.telefono = telefono;
          this.fecha_Nacimiento = fecha_Nacimiento;
          this.id_rol = id_rol;
    }
}
