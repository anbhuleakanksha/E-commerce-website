import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const user = localStorage.getItem('userName'); // Check if user is logged in

  if (!user) {
    router.navigate(['/login']); // Redirect to login if not logged in
    return false;
  }
  return true; // Allow access if user is logged in
};
