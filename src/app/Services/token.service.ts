


import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TokenService {
/*La réclamation «iss» (émetteur) identifie le mandant qui a émis le
 JWT. Le traitement de cette réclamation est généralement spécifique à l'application.
 La valeur "iss" est une chaîne sensible à la casse contenant un StringOrURI
 valeur. L'utilisation de cette réclamation est FACULTATIVE.
*/
 private  iss = 
 {  login : 'http://localhost:8000/api/login',
  signup : 'http://localhost:8000/api/signup'
 };
  constructor() {}
  
  handle(token)
  {
     this.set(token);
  }

  set(token)
  {
    localStorage.setItem('token',token);

  }
  
  get()
  {
    return  localStorage.getItem('token');
  }
  
  remove()
  {
    localStorage.removeItem('token');
  }
  
 isValide()
 { const  token  = this.get();
    if(token)
    {
      const payload = this.payload(token);
      if(payload)
      { 
      //comparer si  un  element  de l'objet et  dans le  payload.isss
      return  Object.values(this.iss).indexOf(payload.iss) > -1? true : false ;
      }
    }
      return false;
  }

 payload(token)
 {
  const payload = token.split('.')[1];
  return this.decode(payload);
 }
 //pour  décoder  le  token base-64
 decode(payload)
 {
   return JSON.parse(atob(payload));
 }
 loggedIn()
 {
   return this.isValide();
 }
 getUser()
 {
  return  JSON.parse(localStorage.getItem('user'));
 }
 getNotification()
 {
  return  JSON.parse(localStorage.getItem('notification'));
 }
}