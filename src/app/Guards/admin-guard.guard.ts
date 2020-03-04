import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree , Router} from '@angular/router';
import { Observable } from 'rxjs';
import { JwtHelperService } from "@auth0/angular-jwt";

@Injectable({
  providedIn: 'root'
})
export class AdminGuardGuard implements CanActivate {
  constructor(private router:Router){}
  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  let token = localStorage.getItem("access_token");
   //let  token =  this.Token.get();
   const helper = new JwtHelperService();
   const decodedToken = helper.decodeToken(token);
   console.log(token)
   if(decodedToken.role =="admin")
   {
     this.router.navigate(['/Admin'])
     return true;
     console.log('aaaa');
     
   }
   else
   {
     return false;
   }
  }
  
}