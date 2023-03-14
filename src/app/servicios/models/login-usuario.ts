export class LoginUsuario {
  nombreusuario!: string;
    email!: string;
    password!: string;

    constructor(nombreusuario:string, email:string, password:string){
        this.nombreusuario = nombreusuario;
        this.email = email;
        this.password = password;
    }

}