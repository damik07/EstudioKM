export class LoginUsuario {
  nombreusuario!: string;
    
    password!: string;

    constructor(nombreusuario:string, password:string){
        this.nombreusuario = nombreusuario;
        
        this.password = password;
    }

}