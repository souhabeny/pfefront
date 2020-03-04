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
 private  iss = {  login : 'http://localhost:8000/api/login',
  signup : 'http://localhost:8000/api/signup'

};
  constructor() { }
  //localStorage prendre  le token 
  handle(token)
  {
     this.set(token);
     //seulement  pour tester handle  existe dans login
     //console.log(this.isValide());
  }
  set(token)
  {
    localStorage.setItem('token',token);

  }
  //get le  token token  en  parameter  c'est  le key 
  get()
  {
    return  localStorage.getItem('token');

  }
  //supprimer  un  token  token  en  parameter  c'est  le key 
  remove()
  {
    localStorage.removeItem('token');
  }
  //verifier s'il y a token   dans  la  BD
 isValide()
 { const  token  = this.get();
    if(token)
    {
      const payload = this.payload(token);
      if(payload)
    { //console.log(payload);
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
}
