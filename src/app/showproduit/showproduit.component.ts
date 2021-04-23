import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { ServicesService } from '../Services/services.service';
import {Produit} from '../model/produit';
import {ProduitService} from '../Services/produit.service';
import { FormBuilder, FormGroup , Validators,FormControl} from "@angular/forms";
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
@Component({
  selector: 'app-showproduit',
  templateUrl: './showproduit.component.html',
  styleUrls: ['./showproduit.component.scss']
})
export class ShowproduitComponent implements OnInit {

produit=new Produit();
data:any;
id:any;
dataprod:any;
data1:any;
nbproduitpanier: number = 0;
i=0;
qte: number;
q: number;
prod = [];
p3 = [] ;
p1 = [];
p2 = [];
produits: Produit[];
produitpanier:Produit[];
tablecouleur = [];
form: FormGroup;
constructor(private route:ActivatedRoute,public notif: SnotifyService ,private  Services: ServicesService,private produitService:ProduitService,
    public fb: FormBuilder) 
     { 
      this.form = this.fb.group({
        qte: ['']});
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
          this.prod=[];
         
        
             this.data ={
              produit: produit,
              qte: this.qte
          }
          
      this.prod.push(this.data);
  this.produitService.ajouterproduit(this.prod);
    
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
          this.prod=[];
         
        
             this.data ={
              produit: produit,
              qte: this.qte
          }
          
      this.prod.push(this.data);
      this.produitService.ajouterproduit(this.prod);
      this.notif.success('Un article de ce produit  est  ajouté au panier',{timeout:5000});
            }
       else
         { 
          this.notif.error("Produit  existe dans  votre  panier",{timeout:4000});
         }
      }
 this.nbproduitpanier=this.prod.length;
 this.produitService.updatevaleurpanier(this.nbproduitpanier);
 
}
  

ngOnInit()
 {
    this.id=this.route.snapshot.params.id;
  
    this.qte=1;
    this.p3 = JSON.parse(localStorage.getItem('prod'));
    this.Services.getProduitByid(this.id).subscribe(data=>{
      this.data=data;
      var j=0;
      var pcol=data[0].couleur;
      var  str =this.data[0].couleur.replace(/\"/g, "");
     
     for(var i=0; i<pcol.length;i++)
      {        
         if(pcol[i]==",")
         {
           j++;
         
         }
       
      }
    this.tablecouleur =str.split(",",j+1);
    this.produit=this.data[0];
     
    for(let i=0; i<this.p3.length;i++)
      {   
        if(this.p3[i].produit.id ==  this.produit.id)
        {
          this.qte = this.p3[i].qte;
        }
       
      }
       if(this.produit.promo>0)
       {
        this.produit.prix=this.produit.prix- ((this.produit.prix/100 )* this.produit.promo);
       }
     });
}

}
