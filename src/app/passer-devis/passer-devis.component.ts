import { Component, OnInit } from '@angular/core';
import {ProduitService} from '../Services/produit.service';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { AuthService } from 'src/app/Services/auth.service';
import { ServicesService } from '../Services/services.service';
import { TokenService } from '../Services/token.service';
import { FormBuilder, FormGroup , Validators,FormControl} from "@angular/forms";
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
@Component({
  selector: 'app-passer-devis',
  templateUrl: './passer-devis.component.html',
  styleUrls: ['./passer-devis.component.scss']
})
export class PasserDevisComponent implements OnInit {
 
  formLigneCommande: FormGroup;
  formLigne: FormGroup;
  p2 = [];
  total:number;
  commande:any;
  data:any; 
  user :  any ;
  adresselivraison =  '';
  hideAdresse: boolean =true;
constructor(private produitService:ProduitService,private auth:AuthService,private  Services: ServicesService,public notif: SnotifyService,private Token:TokenService,public fb: FormBuilder ) 
{
    this.formLigneCommande = this.fb.group({
        adresselivraison:[''],});
   this.formLigne = this.fb.group({
        adresselivraison1:[''],});
}
ngOnInit() 
{ 
  var header = {
     headers: new HttpHeaders().set('Authorization',`Bearer ${this.Token.get()}`)
               }
  this.p2 = JSON.parse(localStorage.getItem('devis'));
  this.total=this.p2[0].prixpropose + 7;
  this.Services.getAuthUser(header).subscribe(data =>
    {
      this.data = data;
      this.adresselivraison =  this.data.adresse;
    }, error => console.error(error));
}
validerCommande()
{  this.user =   JSON.parse(localStorage.getItem('user'));
 var formData: any = new FormData();
 formData.append("iduser", this.user.id);
 this.Services.addCommande(formData).subscribe(
      data=>
      {
        this.commande=data;
        for(let i=0;i<this.p2.length;i++)
        { 
          var formData2: any = new FormData();
          formData2.append("idProduit", this.p2[i].idProduit);
          formData2.append("idCommande", this.commande.id);
          formData2.append("qtecommande", this.p2[i].qte);
          if(this.formLigneCommande.get('adresselivraison').value != '')
            {
              formData2.append("adresselivraison",this.formLigneCommande.get('adresselivraison').value);
              this.adresselivraison =  this.formLigneCommande.get('adresselivraison').value;
            }
          else
            {
             formData2.append("adresselivraison",this.data.adresse);
            }
          this.Services.addligneCommande(formData2).subscribe(
           data=>
           {
             this.formLigneCommande.patchValue({
                adresselivraison: ''}); 
           });
        }
        this.p2 = JSON.parse(localStorage.getItem('devis'));
           var tab = {
             produit :  this.p2,
             id : this.commande.id
           }
            this.Services.devisArtisan(tab).subscribe(data=>{console.log(data);});
            this.Services.devisClient(tab).subscribe(data=>
              {  var valide = "valide" ;
                 var formData: any = new FormData();
                formData.append("reponse",valide);
                this.Services.updatedevis(formData,this.p2[0].id).subscribe(data=>console.log(data));
                this.notif.info('Veuillez vérifier votre boîte de réception...',{timeout:5000});
                this.notif.success('Votre commande est passé avec succès ',{timeout:5000});
                this.produitService.removeDevis();
                this.p2.splice(0,this.p2.length);
                this.total=0;
              });
      });
}
showAdresse()
{
  if(this.hideAdresse==true)
    {
       document.getElementById("ajoutAdresse").hidden = false;
       this.hideAdresse=false
    }
 else
   { 
     document.getElementById("ajoutAdresse").hidden = true;
     this.hideAdresse=true
   }
}
imprimer()
{ 
  this.user =   JSON.parse(localStorage.getItem('user'));
  this.adresselivraison = this.data.adresse;
   if(this.formLigneCommande.get('adresselivraison').value != '')
   {
     this.adresselivraison =  this.formLigneCommande.get('adresselivraison').value;
   }
   let printuser, winfact,printprod, printimg;
   printuser = document.getElementById('detailsuser').innerHTML;
   printprod = document.getElementById('detailprod').innerHTML;
   printimg = document.getElementById('detailimg').innerHTML;
   winfact = window.open();
   winfact.document.write(`
     <html>
       <head>
         <title>Facture</title>
        <style>
        h6{
          font-size:15px
        }
        h5{
         font-size:20px;
       }
       h6 span{
         font-size:12px
       }
       table {
         width: 100%;
       }
     .title{
       margin-left:250px
     }
        </style>
       </head>
   <body onload="window.print();window.close()">
   <div class="title">
   <img src="../../assets/logo.png"  width="140px" height="45px" > 
   </div>
   ${printuser}
   <hr>
   <h5>2. Votre commande </h5>
   ${printimg}
   ${printprod}
   <h5> Adresse livraison : ${this.adresselivraison} </h5>
   </body>
     </html>`
   );
   winfact.document.close();
}
}
