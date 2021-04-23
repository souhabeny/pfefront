import { Component, OnInit } from '@angular/core';
import {ProduitService} from '../Services/produit.service';
import { AuthService } from 'src/app/Services/auth.service';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup , Validators,FormControl} from "@angular/forms";
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

@Component({
  selector: 'app-panier',
  templateUrl: './panier.component.html',
  styleUrls: ['./panier.component.scss']
})

export class PanierComponent implements OnInit {
 
  form: FormGroup;
  formCouleur: FormGroup;
  loggedIn: boolean;
  qte: number;
  total:number=0;
  someqte: number =0 ;
  nbproduitpanier:number=0;
  i:number;
  data:any;
  p2 = [];
  tabn = [];
  tabbol = [];
constructor(private produitService:ProduitService,public notif: SnotifyService,public fb: FormBuilder,private auth:AuthService,private router:Router) 
{  
  this.form = this.fb.group({
      qte: ['']});
      this.formCouleur = this.fb.group({
        qtecouleur: ['']});
}
color(produit,i,t,j)
{ this.total = 0 
 this.p2[i].tab[j].qte = this.formCouleur.get('qtecouleur').value;
 for(var k =0;k<this.p2[i].tab.length;k++)
 { this.someqte =  this.someqte + this.p2[i].tab[k].qte;
  this.p2[i].qte = this.someqte ;
 }
 for(let i=0; i<this.p2.length;i++)
 {
   this.total = this.total + this.p2[i].qte *this.p2[i].produit.prix
   localStorage.setItem("total", JSON.stringify(this.total));
 }
 localStorage.setItem("prod", JSON.stringify(this.p2));
 this.someqte =0 ;
}
update(p,i)
{   
    this.total = 0 
    this.i = i;
    this.qte = this.form.get('qte').value;
    localStorage.setItem("qte", JSON.stringify(this.qte));
    this.p2[this.i].qte = localStorage.getItem('qte');
    localStorage.setItem("prod", JSON.stringify(this.p2));
    for(let i=0; i<this.p2.length;i++)
    {
      this.total = this.total + this.p2[i].qte *this.p2[i].produit.prix
      localStorage.setItem("total", JSON.stringify(this.total));
    }

  
}
devis(i,produit)
{ this.someqte = 0;
  for(var j=0;j<produit.tab.length;j++)
  {  this.someqte =  this.someqte + produit.tab[j].qte;
    if(this.someqte == 0)
    {
      this.notif.error("Valider le  choix  de  votre  couleur",{timeout:4000});
      this.router.navigateByUrl('/panier');
    }
    else
    {
       if(produit.tab[j].qte ==0)
     {
      produit.tab.splice(j,1);
      
      localStorage.setItem("p", JSON.stringify(produit));

      
        if(this.loggedIn == false)
        {
          this.router.navigateByUrl('/login');
        }
        if(this.loggedIn == true)
        {  
          this.router.navigateByUrl('/panier/devis');
        }   
    }
    else
    {
      localStorage.setItem("p", JSON.stringify(produit));
        if(this.loggedIn == false)
        {
          this.router.navigateByUrl('/login');
        }
        if(this.loggedIn == true)
        {  
           this.router.navigateByUrl('/panier/devis');
        }  
    }
  }
}
}
consultdevisclient()
{
      if(this.loggedIn == false)
      {
        this.router.navigateByUrl('/login');
      }
      if(this.loggedIn == true)
      {
        this.router.navigateByUrl('/panier/consulterDevisClient');
      }
}
deleteColor(i,j,tab)
{
 tab.splice(j, 1);
 this.p2[i].produit.couleur = tab ;
 this.total = JSON.parse(localStorage.getItem('total'));
 this.total = this.total -  (this.p2[i].tab[j].qte * this.p2[i].produit.prix);
 localStorage.setItem("total", JSON.stringify(this.total));
 this.p2[i].qte =this.p2[i].qte - this.p2[i].tab[j].qte ;
 this.p2[i].tab.splice(j,1);
 localStorage.setItem("prod", JSON.stringify(this.p2));
 }
ngOnInit() 
{ 
    this.auth.authStatus.subscribe(value => this.loggedIn = value) ;
    this.p2 = this.produitService.getAllProduit() ;
    for(this.i=0;this.i<this.p2.length;this.i++)
     {
      if(this.p2[this.i].produit.couleur == "vide")
      {
         this.tabbol.push(true);
      }
      else
      {
        this.tabbol.push(false);
      }
     }
    for(this.i=0;this.i<this.p2.length;this.i++)
     {
          this.tabn.push(this.p2[this.i].qte);
          this.total = this.total + this.p2[this.i].qte * this.p2[this.i].produit.prix;
          localStorage.setItem("total", JSON.stringify(this.total));
     }
    for(this.i;this.i<this.p2.length;this.i++)
     {
          this.p2[this.i].qte = localStorage.getItem('qte');
     }

 
}
supprimerproduit(index,produit)
{   
      this.total = JSON.parse(localStorage.getItem('total'));
      this.total = this.total - (produit.produit.prix * produit.qte);
      localStorage.setItem("total", JSON.stringify(this.total));
      this.produitService.removeproduit(index);
      this.p2=this.p2.filter(p=>p!==produit); 
}
passercommand()
{  this.someqte =0 ;
  var tab = [];
    for(var i=0; i<this.p2.length;i++)
    { 
       for(var k =0;k<this.p2[i].tab.length;k++)
          {           
             this.someqte =  this.someqte + this.p2[i].tab[k].qte;
             if(this.p2[i].tab[k].qte == 0 && this.someqte != 0 )
            {
              this.p2[i].tab.splice(k,1);
              this.p2[i].produit.couleur.splice(k,1);
              localStorage.setItem("prod", JSON.stringify(this.p2));
            }
            if(this.someqte == 0 && this.p2[i].tab.length != 0 )
            {
              this.notif.error("Valider le  choix  de  votre  couleur",{timeout:4000});
              this.router.navigateByUrl('panier');
            }
            else
            { 
                if(this.loggedIn == false)
                {
                    this.router.navigateByUrl('/login');
                }
                if(this.loggedIn == true)
                {
                this.router.navigateByUrl('/panier/passcommand');
                }
            }
          }
          if(this.p2[i].qte == 0 && this.p2[i].tab.length == 0 )
          {
            this.p2.splice(i,1);
            localStorage.setItem("prod", JSON.stringify(this.p2));
            this.nbproduitpanier = this.p2.length;
            this.produitService.updatevaleurpanier(this.nbproduitpanier);
          }
          else
          {
             if(this.p2[i].qte == 1 && this.p2[i].tab.length == 0 )
             {
                this.p2.splice(i,1);
                localStorage.setItem("prod", JSON.stringify(this.p2));
                this.nbproduitpanier = this.p2.length;
                this.produitService.updatevaleurpanier(this.nbproduitpanier);
              }
          }
          this.someqte = 0;
        } 

    
}
consultcommand()
{
    if(this.loggedIn == false)
    {
      this.router.navigateByUrl('/login');
    }
    if(this.loggedIn == true)
    {
      this.router.navigateByUrl('/panier/consultercommandclient');
    }
}

}