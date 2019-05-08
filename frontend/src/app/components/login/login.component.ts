import { Component, OnInit } from '@angular/core';
import { JarwisService } from '../../Service/jarwis.service';
import { TokenService } from '../../Service/token.service';
import { AuthService } from '../../Service/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public form = {
      email : null,
      password : null
  };
  public error = null;
  
  constructor(
    private jarwisService : JarwisService,
    private Token: TokenService,
    private router : Router,
    private auth : AuthService) { }
  ngOnInit() {
  }

  onSubmit() {
      this.jarwisService.login(this.form).subscribe(
          data   => this.handleResponse(data),
          error  => console.log(error)
      );
  }

  handleResponse(data) {
      this.Token.handle(data.access_token);
      this.auth.changeAuthStatus(true);
      this.router.navigateByUrl('/profile');
  }

  handleError(error) {
    this.error = error.error.error;
  }

}
