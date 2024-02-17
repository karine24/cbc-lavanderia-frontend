import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';
import { Observable } from 'rxjs';

export const secureInnerPageGuard : CanActivateFn = (route, state): Observable<boolean> | Promise<boolean> | boolean => {
  const router: Router = inject(Router);
  const authService: AuthService = inject(AuthService);

  // Check the user is logged in or not(In case the user is not logged in he will be redirected to Signin page)
  if(authService.isLoggedIn !== true) {
    router.navigate(['login'])
  }
  return true;
};
