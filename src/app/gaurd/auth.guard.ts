import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = () => {
  const router = inject(Router)
  if(sessionStorage.getItem("token")){
    // authorised user
    return true;

  }else{
    alert(`Unauthorised Access... Please Login!!!`)
    router.navigateByUrl("/login")
    return false
  }

};
