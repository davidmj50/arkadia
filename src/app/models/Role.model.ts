export interface IRole {
    id_rol: number;
	nombre_Rol: string;
}

export class Role {
    id_rol: number;
    nombre_Rol: string;
    
    constructor(id_rol: number, nombre_Rol: string) {
        this.nombre_Rol = nombre_Rol;
        this.id_rol = id_rol;
    }
}