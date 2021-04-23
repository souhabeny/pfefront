import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../Services/services.service';
import { FormBuilder, FormGroup , Validators,FormControl} from "@angular/forms";

@Component({
  selector: 'app-consulter-devis',
  templateUrl: './consulter-devis.component.html',
  styleUrls: ['./consulter-devis.component.scss']
})

export class ConsulterDevisComponent implements OnInit {
  
  formok : FormGroup;
  formrefuser : FormGroup;
  user : any ;
  produits :  any ;
  search:any;
  okvalue =  "ok";
  refuservalue =  "refuser";
  tablecouleur = [];
  tablecouleurAll = [];
  tableqte = [];
  tableqteAll = [];
constructor(private  Services: ServicesService,public fb: FormBuilder) 
{
      this.formok = this.fb.group({
        ok:[''],});
      this.formrefuser = this.fb.group({
        refuser:[''],});
}
ngOnInit()
{
    this.user = JSON.parse(localStorage.getItem('user'));
    this.getdevis();
}
ok(produit)
{  
  var ok =  "ok";
  this.formok.patchValue({
     ok: ok});
  var formData: any = new FormData();
  formData.append("reponse",this.formok.get('ok').value);
  this.Services.updatedevis(formData,produit.id).subscribe(data=>console.log(data));
  this.produits=this.produits.filter(p=>p!==produit);
}
refuser(produit)
{   
  var refuser =  "refuser";
  this.formrefuser.patchValue({
       refuser: refuser});
  var formData: any = new FormData();
  formData.append("reponse",this.formrefuser.get('refuser').value);
  this.Services.updatedevis(formData,produit.id).subscribe(data=>console.log(data));
  this.produits=this.produits.filter(p=>p!==produit);
}
getdevis():void
{  var j = 0;
   var q = 0;
     this.Services.getdevis(this.user.id).subscribe(data=> 
      {
        this.produits=data;
        for(var k=0;k<this.produits.length;k++)
          {
            var pcol= this.produits[k].couleurSouhaite;
            var pqte= this.produits[k].qtecouleur;
            var  str = this.produits[k].couleurSouhaite.replace(/\"/g, "");
            var  strq = this.produits[k].qtecouleur.replace(/\"/g, "");  
              for(var i=0; i<pcol.length;i++)
              {
                  if(pcol[i]==",")
                  {
                    j++;
                  }
              }
              for(var j=0; j<pqte.length;j++)
              {
                  if(pqte[j]==",")
                  {
                    q++;
                  }
              }
              this.tablecouleur =str.split(",",j+1);
              this.tablecouleurAll.push(this.tablecouleur);
              this.produits[k].couleurSouhaite = this.tablecouleurAll[k];
              this.tableqte =strq.split(",",q+1);
              this.tableqteAll.push(this.tableqte);
              this.produits[k].qtecouleur = this.tableqteAll[k];
          }
      });
} 

      
}
