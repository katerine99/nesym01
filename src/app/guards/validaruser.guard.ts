import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const validaruserGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);

  let iduser = sessionStorage.getItem('id');

  if (iduser == null) {
    router.navigate(['/login']);
    return false;
  }
  return true;
}




