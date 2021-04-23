import { Component, OnInit } from '@angular/core';
import {ProduitService} from '../Services/produit.service';
import { ServicesService } from '../Services/services.service';
import { TokenService } from '../Services/token.service';
import { AuthService } from '../Services/auth.service';
import { FormBuilder, FormGroup , Validators,FormControl} from "@angular/forms";
import { HttpClient , HttpHeaders } from '@angular/common/http';
import {ActivatedRoute} from '@angular/router';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import {Router} from '@angular/router';
@Component({
  selector: 'app-devis',
  templateUrl: './devis.component.html',
  styleUrls: ['./devis.component.scss']
})
export class DevisComponent implements OnInit {
  form : FormGroup;
  prod :any;
  data :any;
  qte :any ;
  prix : number ;
  produits = [];
constructor(public produit :ProduitService,private route:Router,public notif: SnotifyService,private  Services: ServicesService,private Token:TokenService , private Auth:AuthService,public fb: FormBuilder) 
{
  this.form = this.fb.group
     ({
       qte:[''],
       prix_propose: new FormControl(null), 
      });
}
ngOnInit() 
{  this.produits = JSON.parse(localStorage.getItem('prod'));
   this.prod = JSON.parse(localStorage.getItem('p'));
   this.prix =  this.prod.produit.prix * this.prod.qte  ;
}

onSubmit()
{
  var formData: any = new FormData();
  var reponse ="null";
  var header = {
    headers: new HttpHeaders().set('Authorization',`Bearer ${this.Token.get()}`)
               }
  this.Services.getAuthUser(header).subscribe(data =>
     {
        this.data = data;
        var tabc = [];
        var tabq = [];
       
        for(var i=0;i<this.prod.tab.length;i++)
        {
          tabc.push(this.prod.tab[i].tc);
          var q = this.prod.tab[i].qte;
           tabq.push(q);
        }
        formData.append("prixpropose", this.form.get('prix_propose').value);
        formData.append("qte",this.prod.qte);
        formData.append("couleurSouhaite",  tabc);
        formData.append("qtecouleur",  tabq);
        formData.append("idUser", this.data.id);
        formData.append("idProduit",this.prod.produit.id);
        formData.append("reponse",reponse);
        this.Services.devis(formData).subscribe(
          data=>{
             this.notif.success('Votre demande devis a été envoyé avec succès',{timeout:5000});
             for(var i=0;i<this.produits.length;i++)
             {
               if(this.produits[i].produit.id == this.prod.produit.id)
               {
                this.produits.splice(i,1);
                localStorage.setItem("prod", JSON.stringify(this.produits));
                this.produit.updatevaleurpanier(this.produits.length);
               }
             }
             localStorage.removeItem("p");
             this.route.navigateByUrl('devis/catalogue');
            
            },error=>console.log(error));
      });
}
get  prix_propose() {return this.form.get('prix_propose')}
}
