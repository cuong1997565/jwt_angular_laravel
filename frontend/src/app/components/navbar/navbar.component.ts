import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Service/auth.service';
import { Router } from '@angular/router';
import { TokenService } from '../../Service/token.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  public loggedIn: boolean;
  constructor( private Auth : AuthService,private router : Router,private token :TokenService) { }

  ngOnInit() {
      this.Auth.authStatus.subscribe(value => this.loggedIn = value);
  }

  logout(event : MouseEvent) {
      event.preventDefault();
      this.token.remove();
      this.Auth.changeAuthStatus(false);
      this.router.navigateByUrl('/login');
  }

}
