import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {Produit} from '../model/produit';
import { Categorie } from '../model/categorie';
import { Gouvernerat } from '../model/gouvernerat';
import { User } from '../model/user';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
private baseUrl ='http://localhost:8000/api';
  constructor(private http: HttpClient) {}
  
   //produit
   addproduit(data,Headers)
   {
      return  this.http.post(`${this.baseUrl}/addproduct`,data,Headers);
   }
  
   getallProduit():Observable<Produit[]>
   {
      return  this.http.get<Produit[]>(`${this.baseUrl}/allproducts`); 
   }

   getproduitOrderByDate():Observable<Produit[]>
    {
       return  this.http.get<Produit[]>(`${this.baseUrl}/getproduitOrderByDate`);
    }

   getProduitByUser(idUser:any):Observable<Produit[]>
   {
      return this.http.get<Produit[]>(`${this.baseUrl}/allproducts/${idUser}`) ; 
   }

   getProduitByid(id:any):Observable<Produit[]>
   {
     return this.http.get<Produit[]>(`${this.baseUrl}/produitbyid/${id}`) ; 
   }

   getprodbycategorie(id:any):Observable<Produit[]>
   {
     return this.http.get<Produit[]>(`${this.baseUrl}/getprodbycategorie/${id}`) ; 
   }
  
   getProduitpromo():Observable<Produit[]>
   {
     return this.http.get<Produit[]>(`${this.baseUrl}/produitpromo`) ; 
   }

   updateProduit(data,id,Headers)
   {
     return  this.http.post(`${this.baseUrl}/updateProduct/`+id,data,Headers);
   }

   deleteProduit(id:number):Observable<{}>
   {
     return this.http.delete(`${this.baseUrl}/delete/${id}`);
   }

   getnbProduitArtisan(id:any)
   {
     return this.http.get(`${this.baseUrl}/countproduitUser/${id}`) ; 
   }
   //Commande
   addCommande(data)
   {
    return  this.http.post(`${this.baseUrl}/addCommande`,data);
   }

   addligneCommande(data)
   {
    return  this.http.post(`${this.baseUrl}/addligneCommande`,data);
   }

   emailArtisan(data)
   {
      return this.http.post(`${this.baseUrl}/emailArtisan`,data) ;  
   }

   emailClient(data)
   {
    return  this.http.post(`${this.baseUrl}/emailClient`,data);
   }
   getProduitCommandClient(id):Observable<any[]>
   {
     return this.http.get<any[]>(`${this.baseUrl}/getProduitCommandClient/${id}`) ; 
   }

   getProduitCommandArtisan(id):Observable<any[]>
   {
     return this.http.get<any[]>(`${this.baseUrl}/getProduitCommandArtisan/${id}`) ; 
   }

   getProduitCommandclientdernier(id):Observable<any[]>
   {
      return this.http.get<any[]>(`${this.baseUrl}/lastcommades/${id}`) ; 
   }
   getnbCommandeArtisan(id:any)
   {
      return this.http.get(`${this.baseUrl}/nbcommandeArtisan/${id}`) ; 
   }

   getcommandByUser(id:any):Observable<any[]>
   {
     return this.http.get<any[]>(`${this.baseUrl}/getcommandByUser/${id}`) ; 
   }
   getlignecommandByCommand(idc:any):Observable<any[]>
   {
     return this.http.get<any[]>(`${this.baseUrl}/getlignecommandByCommand/${idc}`) ; 
   }
   // Client

   nbAchatClient(id:any)
   {
    return this.http.get(`${this.baseUrl}/nbAchatClient/${id}`) ;
   }

   //categorie
  
   getallCategorie():Observable<Categorie[]>
   {
      return  this.http.get<Categorie[]>(`${this.baseUrl}/allcategories`); 
   }

  //Gouvernerat

   getallGouvernerat():Observable<Gouvernerat[]>
   {
      return  this.http.get<Gouvernerat[]>(`${this.baseUrl}/allgouvernerats`); 
   }

   //user
   
   VerifierMotDePasse(data)
   {
    return  this.http.post(`${this.baseUrl}/decrypt`,data);
   }

   signup(data,Headers)
   {
     return  this.http.post(`${this.baseUrl}/signup`,data,Headers);
   }

   updateUser(data,id,Headers)
   {
     return  this.http.post(`${this.baseUrl}/updateUser/`+id,data,Headers);
   }
  
   login(data)
   {
    return  this.http.post(`${this.baseUrl}/login`,data) ; 
   }
  
   sendPasswordResetLink(data)
   {
    return this.http.post(`${this.baseUrl}/sendPasswordReset`,data)  ;
   }

   changePassword(data)
   {
    return this.http.post(`${this.baseUrl}/responsepasswordreset`,data)  ;
   }

   getAuthUser(header) 
   {
    return this.http.get(`${this.baseUrl}/user`,header)  ;
   }
  
 //messages
 getmessage(id:number,idc:number):Observable<any[]>
 {
  return this.http.get<any[]>(`${this.baseUrl}/messages/${id}/${idc}`) ; 
 } 

 sendmessage(data)
 {
  return  this.http.post(`${this.baseUrl}/messages`,data);
 }
 getUsersSendmessage(id:number):Observable<any[]>
 {
  return this.http.get<any[]>(`${this.baseUrl}/contact/${id}`) ; 
 } 

 //like
 addlike(data,pos:number)
 {
  return  this.http.post(`${this.baseUrl}/addLike/${pos}`,data);
 } 
 addDislike(data,pos:number)
 {
  return  this.http.post(`${this.baseUrl}/addDisLike/${pos}`,data);
 } 
 countlikes(id:number)
 {
  return this.http.get(`${this.baseUrl}/countlikes/${id}`) ; 
 }
 countdislikes(id:number)
 {
  return this.http.get(`${this.baseUrl}/countdislikes/${id}`) ; 
 }
 existlikes(idp:number,idu:number)
 {
  return this.http.get(`${this.baseUrl}/existlikes/${idp}/${idu}`);
 }
 existdislikes(idp:number,idu:number)
 {
  return this.http.get(`${this.baseUrl}/existdislikes/${idp}/${idu}`);
 }
 deletedislike(idp:number,idu:number)
 {
  return this.http.delete(`${this.baseUrl}/deletedislike/${idp}/${idu}`);
 }
 deletelike(idp:number,idu:number)
 {
  return this.http.delete(`${this.baseUrl}/deletelike/${idp}/${idu}`);
 }
 //devis
 devis(data)
 {
  return  this.http.post(`${this.baseUrl}/sendDevis`,data);
 }
 devisClient(data)
 {
  return  this.http.post(`${this.baseUrl}/devisClient`,data);
 }
 devisArtisan(data)
 {
  return  this.http.post(`${this.baseUrl}/devisArtisan`,data);
 }
 getdevis(id:number):Observable<any[]>
 {
  return this.http.get<any[]>(`${this.baseUrl}/devisArtisan/${id}`) ; 
 } 

 updatedevis(data,id)
 {
    return  this.http.post(`${this.baseUrl}/updateDevis/`+id,data);
 }

getdevisclient(id:number):Observable<any[]>
{
  return this.http.get<any[]>(`${this.baseUrl}/devisClient/${id}`) ; 
} 

}
