import { Component } from '@angular/core';
import { TokenService } from './servicios/token.service';
import { SidebarService } from './sidebar/sidebar.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'Estudio K&M';
  isLogged = false;

  constructor(public sidebarservice: SidebarService, private tokenService:TokenService) { }
  toggleSidebar() {
    this.sidebarservice.setSidebarState(!this.sidebarservice.getSidebarState());
  };

  toggleBackgroundImage() {
    this.sidebarservice.hasBackgroundImage = !this.sidebarservice.hasBackgroundImage;
  };

  getSideBarState() {
    return this.sidebarservice.getSidebarState();
  };

  hideSidebar() {
    this.sidebarservice.setSidebarState(true);
  };

  ngOnInit(): void {
    if(this.tokenService.getToken()){
      this.isLogged = true;
    } else {
      this.isLogged = false;
    }
  };

  cerrar(){
    this.tokenService.logOut();
    window.location.reload();
  };

}
