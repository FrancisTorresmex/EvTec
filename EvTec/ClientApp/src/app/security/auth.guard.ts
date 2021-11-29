import { Injectable } from "@angular/core";
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from "@angular/router";
import { Observable } from "rxjs";
import { LoginComponent } from "../login/login.component";


@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {

  constructor(private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    

    if (localStorage.getItem('sesion') != null) {
      return true;
    }

    this._router.navigate(['/']);
    return false;    
  }

}
