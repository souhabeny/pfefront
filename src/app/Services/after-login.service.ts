import { Injectable } from '@angular/core';
import { TokenService } from './token-service.service';
import { Observable } from 'rxjs';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot }from '@angular/router';
@Injectable()
export class AfterLoginService implements CanActivate{
  canActivate(route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot):  boolean   |
     Promise<boolean> | Observable<boolean>
     {
       return this.Token.loggedIn();
     }
  constructor(private Token:TokenService) { }
}
