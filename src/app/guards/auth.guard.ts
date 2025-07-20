import { CanActivateFn } from '@angular/router';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const isLoggedIn = sessionStorage.getItem("isLoggedIn");
  const router = inject(Router);

  if (isLoggedIn === 'true') {
    return true;
  } else {
    alert("You are not logged in....");
    router.navigate(['/auth/login']);
    return false;
  }
};
