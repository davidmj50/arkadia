import { IRole } from "./Role.model";

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
    rol: IRole;
}