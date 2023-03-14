import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth.service';
import { TokenService } from '../token.service';

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  realRole!: string;

  constructor(private authService:AuthService, private ruta:Router, private token:TokenService){}
  canActivate(
    route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
      //let currentUser=this.authService.UsuarioAutenticado; texto de luisina en las masterclass
      //if (currentUser && currentUser.accessToken){
      //  return true;
      //}
      //else {
      //  this.ruta.navigate(['/iniciar-sesion']);
      //  return false;
      //}

      //const expectedRol = route.data.expectedRol;
      const roles = this.token.getAuthorities();
      this.realRole = 'user';
      roles.forEach(rol=> {
        if(rol === 'ROLE_ADMIN'){
        this.realRole = 'admin';
        }
      });
      if(!this.token.getToken()){
        this.ruta.navigate(['/']);
        return false;

      }

      return true;
  }
}
