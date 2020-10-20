export interface IContact {
    
	id?: number;
    eMail: string;
    mensaje: string;
    atendido?: boolean;
}

export class Contact{
    id?: number;
    eMail: string;
    mensaje: string;
    atendido?: boolean;

    constructor(id: number, eMail: string, mensaje: string, atendido: boolean){
        this.id=id;
        this.eMail=eMail;
        this.mensaje=mensaje;
        this.atendido=atendido;
    }
}