import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup , Validators,FormControl} from "@angular/forms";
import { ServicesService } from '../Services/services.service';
import { TokenService } from '../Services/token.service';
import { AuthService } from '../Services/auth.service';
import {Router} from '@angular/router';
import {Produit} from '../model/produit';
import {ProduitService} from '../Services/produit.service';
import {Categorie} from '../model/categorie';
import Echo from 'laravel-echo';
import { Observable } from 'rxjs';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
@Component({
  selector: 'app-catalogue',
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss']
})
export class CatalogueComponent implements OnInit {

  
  @ViewChild('content', { static: true }) public contentModal;
  @ViewChild('contentchat', { static: true }) public contentModalchat;
  form: FormGroup;
  formmsg:FormGroup;
  loggedIn: boolean;
  slides: any = [];
  produits: any[];
  categories2: Categorie[];
  messages:any[] = [];
  messages1:any[] = [];
  produitspromo:Produit[];
  prod = [];
  tab= [];
  tablecouleur  = [];
  tablecouleurAll = [];
  nbproduitpanier: number = 0;
  prixsearchmin:number;
  categsearch:number;
  prixsearchmax:number;
  data:any;
  produit :any ;
  idclient:any;
  datamsg:any;
  datamessage:any;
  dataAuthuser:any;
  notification : any ;
  search:string;
  echo :Echo;
constructor(private token:TokenService,public notif: SnotifyService ,public  router: Router,private auth:AuthService,private  Services: ServicesService, private produitService:ProduitService,public fb: FormBuilder) 
{  
      var header = {
               headers: new HttpHeaders().set('Authorization',`Bearer ${this.token.get()}`)
                   }
      this.form = this.fb.group({qte: ['']});
      this.formmsg = this.fb.group({
                     idClient:[''],
                     idArtisan:[''],
                     message:[''],});
       this.Services.getAuthUser(header).subscribe(data =>
               this.dataAuthuser = data,
                error => console.error(error));
}
getProduits()
{
 this.Services.getallProduit().subscribe
 ((produits) =>
  {
    this.produits=produits;
    for(let i=0;i<produits.length;i++)
    {
       if(produits[i].promo>0)
       {
         produits[i].prix=produits[i].prix- ((produits[i].prix/100 )* produits[i].promo);
       }
    }
  });
}
ngOnInit()
{
   this.auth.authStatus.subscribe(value => this.loggedIn = value) ;
   this.getProduits();
   this.getCategorie();
   this.getProduitPromo();
   this.getmessageuser();
   this.setupEcho();
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
getCategorie():void
{
 this.Services.getallCategorie().subscribe
  (categories => (this.categories2=categories));
}
categsearchmethod(categorie:Categorie)
{
   this.categsearch=categorie.id;
}
categsearchall()
{
 this.categsearch=null;
}
chunk(arr, chunkSize) 
{
   let R = [];
   for (let i = 0; i < arr.length; i += chunkSize) 
   {
     R.push(arr.slice(i, i + chunkSize));
   }
   return R;
}
getProduitPromo()
{
  this.Services.getProduitpromo().subscribe
   (produits => 
     {
       this.produitspromo=produits,
       this.slides = this.chunk(this.produitspromo, 6);
     });
}
getmessageuser():void
{
   var header = {
     headers: new HttpHeaders().set('Authorization',`Bearer ${this.token.get()}`)
                }
   this.Services.getAuthUser(header).subscribe(data => 
     {
       this.dataAuthuser = data;
       this.Services.getmessage(this.idclient,this.dataAuthuser.id).subscribe
          (messages=> {this.messages=messages});
     }, error => console.error(error));
}
clickMsg(idc)
{ 
 if(this.loggedIn == false)
 {
   this.router.navigateByUrl('/login');
 }
 if (this.loggedIn == true)
 {
   this.idclient=idc;
   this.getmessageuser();
 }
} 
setupEcho()
{
    this.echo=new Echo({
      broadcaster: 'socket.io',
      host:'http://localhost:6001',});
    window['echo']=this.echo;
    this.listene();
}
onSubmit(produit)
{ 
   var formData: any = new FormData();
   formData.append("idClient", this.dataAuthuser.id);
   formData.append("idArtisan", this.idclient);
   formData.append("message", this.formmsg.get('message').value+'@$&*$#*@/@'+produit.id+'@$&*$#*@/@'+produit.libelle+'@$&*$#*@/@'+produit.image);
        this.Services.sendmessage(formData).subscribe(
          data=>
          {
            this.datamsg=data;
            this.formmsg = this.fb.group({
             idClient:[''],
             idArtisan:[''],
             message :[''],})
          },error=>console.log(error));
}
listene()
{ 
    this.echo.channel('Event')
     .listen('.Event',(e)=>
     {
       
       var ind=e.message.length-1;
       this.messages.push(e.message[ind]);
     });
} 


}
