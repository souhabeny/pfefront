import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot }from '@angular/router';
@Injectable()
export class BeforeLoginService implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot): Observable<boolean> |
     Promise<boolean> | boolean 
     {
       return !(this.Token.loggedIn());
     }
  constructor(private Token:TokenService) {}
}
