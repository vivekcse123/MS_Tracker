import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const userGuardGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginService);
  //const isUserLoggedIn = sessionStorage.getItem("isUserLoggedIn");
  let isUserLoggedIn:boolean = false;
  const router = inject(Router);
  login.isUserLogin$.subscribe((res) =>{
    isUserLoggedIn = res;
  })
  if (isUserLoggedIn) {
    return true;
  } else {
    alert("You are not logged in....");
    router.navigate(['/auth/login']);
    return false;
  }
};