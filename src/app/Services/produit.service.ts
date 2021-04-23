import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import {Produit} from '../model/produit';

@Injectable({
  providedIn: 'root'
})
export class ProduitService {

  private valeurcourantepanier = new BehaviorSubject(0);
  courantMessage = this.valeurcourantepanier.asObservable();

  //private valeurproduit = new BehaviorSubject(0);
  //couranProduit = this.valeurproduit.asObservable();
 

  constructor() {}
  
  ajouterproduit(produits: any) 
  {
    localStorage.setItem("prod", JSON.stringify(produits)); 
  }

  gettotal()
  {
    return JSON.parse(localStorage.getItem('total'));
  }

  getAllProduit() 
  {
     return JSON.parse(localStorage.getItem('prod'));
  }
  getAllProduitcommand() 
  {
    
     return JSON.parse(localStorage.getItem('prod'));
  }
  removeTotal()
  {
    return localStorage.removeItem("total");
    
  }
 
  removeAllProduitpanier()
  {
  
   var gettab2 = JSON.parse(localStorage.getItem('prod'));
   gettab2.splice(0,gettab2.length);
   localStorage.setItem("prod", JSON.stringify(gettab2));
   this.updatevaleurpanier(gettab2.length);
   return JSON.parse(localStorage.getItem('prod'));
  
  }

 removeAllProduitqte()
  {
    return localStorage.removeItem("qte");
    
  }
  removeDevis()
  {
    return localStorage.removeItem("devis");
    
  }
  removeproduit(index)
  { 
   
    var gettab2 = JSON.parse(localStorage.getItem('prod'));
    gettab2.splice(index,1);
    localStorage.setItem("prod", JSON.stringify(gettab2));
    this.updatevaleurpanier(gettab2.length);
     return JSON.parse(localStorage.getItem('prod'));
 }
  
  updatevaleurpanier(count: number)
  {
    this.valeurcourantepanier.next(count);
  }
  /*updatevaleurprocduit(count: number) 
  {
    this.valeurproduit.next(count);
  }
 */
}
