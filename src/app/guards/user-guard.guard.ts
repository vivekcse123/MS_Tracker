import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const userGuardGuard: CanActivateFn = (route, state) => {
  const isUserLoggedIn = sessionStorage.getItem("isUserLoggedIn");
  const router = inject(Router);

  if (isUserLoggedIn === 'true') {
    return true;
  } else {
    alert("You are not logged in....");
    router.navigate(['/auth/login']);
    return false;
  }
};