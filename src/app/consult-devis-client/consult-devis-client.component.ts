import { Component, OnInit } from '@angular/core';
import { ServicesService } from '../Services/services.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-consult-devis-client',
  templateUrl: './consult-devis-client.component.html',
  styleUrls: ['./consult-devis-client.component.scss']
})
export class ConsultDevisClientComponent implements OnInit {

  user : any ;
  data :  any ;
  reponse : any ;
  search:any;
  color :  any ;
  disable: boolean ;
  tab =[];
  tabrep = [];
  disables = [];
  pcouleur = [];
  tablecouleur = [];
  tablecouleurAll = [];
  tableqte = [];
  tableqteAll = [];
  tabbol = [];
  produits = [];
  j = 0;
constructor(private  Services: ServicesService,private router : Router) {}
ngOnInit()
{
  this.user = JSON.parse(localStorage.getItem('user'));
  this.getdevisClient();
}

getdevisClient():void
{  var  j=0;
    var q = 0 ;
  this.Services.getdevisclient(this.user.id).subscribe(data=>
     {
      var  j=0;
      var q = 0 ;
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
       for(var i=0 ;i<this.produits.length;i++)
       { 
          if(this.produits[i].reponse == "null")
            {  
                this.reponse = "En attente";
                this.tabrep.push(this.reponse);
                this.disable = true;
                this.disables.push(this.disable);    
            }
          if(this.produits[i].reponse == 'ok')
            {
                this.reponse = "Demande acceptée";
                this.tabrep.push(this.reponse);
                this.disable = false;
                this.disables.push(this.disable);  
            }
          if(this.produits[i].reponse == 'refuser')
            {
                this.reponse = "Demande  refusée";
                this.tabrep.push(this.reponse);
                this.disable = true;  
                this.disables.push(this.disable);
            }
          }     
     });
    }
passercommand(produit)
{
   this.tab.push(produit);
   localStorage.setItem("devis", JSON.stringify(this.tab));
   this.router.navigateByUrl('consulterDevisClient/passcommand');
}
}