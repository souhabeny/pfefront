import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup , Validators,FormControl} from "@angular/forms";
import { ServicesService } from '../Services/services.service';
import { TokenService } from '../Services/token.service';
import { AuthService } from '../Services/auth.service';
import {Router} from '@angular/router';
import {Produit} from '../model/produit';
import {ProduitService} from '../Services/produit.service';
import {Categorie} from '../model/categorie';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
@Component({
  selector: 'app-produit-categorie',
  templateUrl: './produit-categorie.component.html',
  styleUrls: ['./produit-categorie.component.scss']
})
export class ProduitCategorieComponent implements OnInit {
  id:any;
  data:any;
  selectprix:any;
  produits:Produit[];
  categories2: Categorie[];
  prod = [];
  search:string;
  categsearch:number;
  prixsearchmin:number;
  prixsearchmax:number
  nbproduitpanier: number = 0;
  form: FormGroup;
  tab= [];
  tablecouleur  = [];
constructor(private route:ActivatedRoute,private  Services: ServicesService, public notif: SnotifyService,private produitService:ProduitService,public fb: FormBuilder) 
{   
    this.form = this.fb.group({
      qte: ['']});
}

ngOnInit()
{
    this.id=this.route.snapshot.params.id;
    this.show();
    //this.getCategorie();
}
  
setPrix(value)
{
    this.selectprix = value;
}

AjouterprPanier(produit:Produit)
{ 
 this.prod=this.produitService.getAllProduit();
 if(this.prod==null)
   { 
     var j =0;
     var pcol=produit.couleur;
     var  str =produit.couleur.replace(/\"/g, "");
     for(var i=0; i<pcol.length;i++)
     {
       if(pcol[i]==",")
       {
           j++;
         }
     }
     this.tablecouleur =str.split(",",j+1);
     produit.couleur = this.tablecouleur;
     for(var i = 0; i<produit.couleur.length ; i++)
     { 
       if(produit.couleur[i] == "vide")
       { var couleur = {
          tc: produit.couleur[i],
          qte:1,
          id:produit.id
        }
       this.tab.push(couleur);
       }
       else
       {
        var couleur = {
          tc: produit.couleur[i],
          qte:0,
          id:produit.id
        }
       this.tab.push(couleur);
       }
       }
     this.prod=[];
     this.data ={
         produit: produit,
         qte: 1,
         tab : this.tab
       }
     this.prod.push(this.data);
     this.produitService.ajouterproduit(this.prod);
    this.tab = [];
   }
   else
   {
     let ExistProduit=this.prod.find(p=>p.produit.id==produit.id);
     if(ExistProduit==null)
      {   
         var j =0;
         var pcol=produit.couleur;
         var  str =produit.couleur.replace(/\"/g, "");
         for(var i=0; i<pcol.length;i++)
          {
             if(pcol[i]==",")
             {
                 j++;
               }
          }
         this.tablecouleur =str.split(",",j+1);
         produit.couleur = this.tablecouleur;
         for(var i = 0; i<produit.couleur.length ; i++)
         { if(produit.couleur[i] == "vide")
            { var couleur = {
               tc: produit.couleur[i],
               qte:1,
               id:produit.id
             }
            this.tab.push(couleur);
            }
            else
            {
             var couleur = {
               tc: produit.couleur[i],
               qte:0,
               id:produit.id
             }
            this.tab.push(couleur);
            }
         }
         this.data ={
         produit: produit,
         qte: 1,
         tab : this.tab
       }
         this.prod.push(this.data);
         this.produitService.ajouterproduit(this.prod);
         this.notif.success('Un article de ce produit  est  ajouté au panier',{timeout:5000});
         this.tab = [];
       }
     else
      { 
       this.notif.error("Produit  existe dans  votre  panier",{timeout:4000});
      }
   }
   this.nbproduitpanier=this.prod.length;
   this.produitService.updatevaleurpanier(this.nbproduitpanier);
}
show()
{
    this.Services.getprodbycategorie(this.id).subscribe(res=>
      {
      this.produits=res;
      }
      );
}

}
