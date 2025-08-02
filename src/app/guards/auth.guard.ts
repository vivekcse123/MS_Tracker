import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = (route, state) => {
  const login = inject(LoginService);
  let isLoggedIn: boolean = false;
  login.isLoggedIn$.subscribe((res) =>{
  isLoggedIn = res;
  })
  const router = inject(Router);

  if (isLoggedIn) {
    return true;
  } else {
    alert("You are not logged in....");
    router.navigate(['/auth/login']);
    return false;
  }
};
