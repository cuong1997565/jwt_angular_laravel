import { Injectable } from '@angular/core';
import { BehaviorSubject, from } from '../../../node_modules/rxjs';
import { TokenService } from './token.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private Token: TokenService) { }
  private loggedIn = new BehaviorSubject<boolean>(this.Token.loggedIn());
  authStatus = this.loggedIn.asObservable();
  changeAuthStatus(value){
      this.loggedIn.next(value);
  }
}
