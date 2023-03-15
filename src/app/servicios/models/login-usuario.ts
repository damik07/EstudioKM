export class LoginUsuario {
  nombreusuario!: string;
    cuit!: string;
    password!: string;

    constructor(nombreusuario:string, cuit:string, password:string){
        this.nombreusuario = nombreusuario;
        this.cuit = cuit;
        
        this.password = password;
    }

}