import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { LoginUsuario } from '../../servicios/models/login-usuario';
import { TokenService } from '../../servicios/token.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  form!: FormGroup;
  isLogged = false;
  isLoginFail = false;
  loginUsuario!: LoginUsuario;
  roles: string[] = [];
  errMje!:string;

  constructor(private tokenService: TokenService, private formBuilder: FormBuilder, private authService:AuthService, private ruta:Router) { 
    this.form=this.formBuilder.group({
      nombreUsuario:['',[Validators.required, Validators.minLength(5),Validators.maxLength(12)]],
      cuit:['', [Validators.required, Validators.minLength(11),Validators.maxLength(11)]],
      
      password:['',[Validators.required, Validators.minLength(8)]]
      
    })
  }

  get Usuario(){
    return this.form.get("nombreUsuario");
  }

  get Cuit(){
    return this.form.get("cuit");
  }

  get Password(){
    return this.form.get("password");
  }

  

  onEnviar(event: Event) {
    event.preventDefault;
    
    
    this.authService.Login(this.form.value).subscribe(data=>{
      this.isLogged = true;
      this.tokenService.setToken(data.token);
      this.tokenService.setUserName(data.nombreUsuario);
      this.tokenService.setAuthorities(data.authorities);
      this.roles = data.authorities;

      this.ruta.navigate(['cargaFacComp']);
      console.log("Data: 1");
    },

     err => {
      //this.form.markAllAsTouched();
      
      this.isLogged = false;
      this.isLoginFail = true;
      this.errMje = err.error.mensaje;
      console.log(this.errMje);
    })
  }


  get UsuarioValid(){
    return this.Usuario?.touched && !this.Usuario?.valid;
  }

  get CuitValid(){
    return this.Cuit?.touched && !this.Cuit?.valid;
  }

  get PasswordValid(){
    return this.Password?.touched && !this.Password?.valid;
  }

  
  public nombreUsuario = new FormControl('', Validators.required);
  public cuit = new FormControl('', Validators.required);
  public password = new FormControl('', Validators.required);

  public newForm = new FormGroup({
    nombreUsuario: this.nombreUsuario,
    cuit: this.cuit,
    password: this.password,
  })

  ngOnInit(): void {
    if (this.tokenService.getToken()) {
      this.isLogged = true;
      this.roles = this.tokenService.getAuthorities();
    }

  }

}