import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor() { }

  loginResource = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loginResource.asObservable();

  setLogin(isLogin: boolean){
    this.loginResource.next(isLogin);
  }

  userLoginResource = new BehaviorSubject<boolean>(false);
  isUserLogin$ = this.userLoginResource.asObservable();

  setUserLogin(isLogin: boolean){
    this.userLoginResource.next(isLogin);
  }

}
