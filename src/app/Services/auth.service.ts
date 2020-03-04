import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { TokenService } from './token-service.service';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //Nécessite une valeur initiale et émet la valeur actuelle aux nouveaux abonnés
private loggedIn =  new  BehaviorSubject<boolean>(this.Token.loggedIn());
authStatus =  this.loggedIn.asObservable();
changedAuthStatus(value: boolean)
{
  this.loggedIn.next(value)
}
  constructor(private  Token:TokenService) { }
}
