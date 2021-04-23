import { Component, OnInit,ViewChild } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup , Validators,FormControl} from "@angular/forms";
import { ServicesService } from '../Services/services.service';
import { TokenService } from '../Services/token.service';
import { AuthService } from '../Services/auth.service';
import {Router} from '@angular/router';
import {Produit} from "../model/produit";
import {Categorie} from '../model/categorie';
import {Gouvernerat} from '../model/gouvernerat';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { errorObject } from 'rxjs/internal-compatibility';
import {ProduitService} from '../Services/produit.service';

@Component({
  selector: 'app-profilartisan',
  templateUrl: './profilartisan.component.html',
  styleUrls: ['./profilartisan.component.scss']
})
export class ProfilartisanComponent implements OnInit {

  @ViewChild('content', { static: true }) public contentModal;
  @ViewChild('contentModif', { static: false}) public contentModif;
  @ViewChild('contentprofil', { static: true }) public contentprofil;
 
  form: FormGroup;
  formUpdate: FormGroup;
  formUser: FormGroup;
  formUserPassword : FormGroup;
  formPassword : FormGroup;
  erroruser =null;
  errorupdate =null;
  fileproduit  = null ;
  fileuser = null ;
  bol : any ;
  data:any;
  nbproduit :  any;
  nbprodArtisan:any;
  nbcmdArtsian:any;
  produitimage :any ;
  filedata:any;
  fileimg:any;
  eventColor:any;
  e:any;
  pcouleur:any ;
  color = [];
  tColor = [];
  produits: Produit[];
  produitspromo: Produit[];
  categories2: Categorie[];
  gouvernorats2 :Gouvernerat[];
  couleurs=[];
  tabi=[];
  tab =  [];
  tablecouleur  = [];
  tablecouleurAll  = [];
  id : number ;
  index : number;
  prixpromo :  number;
  i:number=0;
  p:Produit;
  btn:boolean;
  hideElementparam: boolean =true;
  hideElementpwd: boolean =true;
  
  constructor(private router:Router ,private  Services: ServicesService, 
    private Token:TokenService,public notif: SnotifyService,private produitService:ProduitService,private Auth:AuthService,public fb: FormBuilder)
  { 
    this.form = this.fb.group({
      idUser:[''],
      description :new FormControl(null, [ Validators.required]),
      libelle:new FormControl(null, [ Validators.required]),
      image: [null],
      prix :new FormControl(null, [ Validators.required]),
      promo:new FormControl(null),
      couleur:[[]],
      idCategorie : new FormControl(this.categories2,[ Validators.required]) ,
      
    }); 
    this.formUser = this.fb.group({
      nom: new FormControl(null),
      prenom: new FormControl(null),
      email: new FormControl(null,[Validators.email]),
      datenaiss:  new FormControl(null),
      adresse:  new FormControl(null),
      idGouvernerat: new FormControl(this.gouvernorats2 ),
      domaine:new FormControl(null),
      codePostal: new FormControl(null, [Validators.minLength(4),Validators.maxLength(4)]),
      tel:  new FormControl(null, [Validators.minLength(8),Validators.maxLength(8)]),     
      password: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),
      password_confirmation: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),
      image: new FormControl(null)
     
    });
    this.formUserPassword = this.fb.group({
      nom: new FormControl(null),
      prenom: new FormControl(null),
      email: new FormControl(null),
      datenaiss:  new FormControl(null),
      adresse:  new FormControl(null),
      idGouvernerat: new FormControl(this.gouvernorats2 ),
      domaine:new FormControl(null),
      codePostal: new FormControl(null),
      tel:  new FormControl(null), 
      password: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),
      password_confirmation: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),
      image: new FormControl(null)
     
    });
    this.formPassword   = this.fb.group({
      actuel: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),    
      pass: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),   
    });
    this.formUpdate = this.fb.group({
      idUser:[''],
      description :new FormControl(null),
      libelle:new FormControl(null),
      image: new FormControl(null),
      prix : new FormControl(null),
      promo:  [''],
      couleur:[[]],
      idCategorie :new FormControl(this.categories2)
     
    });
  
    var header = {
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.Token.get()}`)
                 }
   this.Services.getAuthUser(header).subscribe(data => {
          this.data = data;
    }, error => console.error(error));
  
}

fileEvent(e)
{
  this.filedata = e.target.files[0];
  
  this.form.patchValue({
    image: this.filedata
  });
  this.form.get('image').updateValueAndValidity();
  this.fileproduit  =  this.filedata.name ;
}

fileupdateuser(e)
{
  this.filedata = e.target.files[0];
  this.formUser.patchValue({
    image: this.filedata
  });
  this.formUpdate.get('image').updateValueAndValidity();
}

fileupdate(e)
{
  this.filedata = e.target.files[0];
  this.formUpdate.patchValue({
    image: this.filedata
  });
  this.formUpdate.get('image').updateValueAndValidity();
  this.produitimage = this.filedata.name;
}

onSubmit(){
  var formData: any = new FormData();
 
  if(this.form.get('promo').value == '' || this.form.get('promo').value ==null)
  { console.log(this.form.get('promo').value);
     const headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    headers.append('Accept', 'application/json');
    formData.append("idUser", this.data.id);
    formData.append("libelle", this.form.get('libelle').value);
    formData.append("description", this.form.get('description').value);
    formData.append("prix", this.form.get('prix').value);
    formData.append("promo",0);
    formData.append("idCategorie", this.form.get('idCategorie').value);
     if(this.couleurs.length!=0)
      
      { 
        formData.append("couleur",this.couleurs);
      }
    
      else
      {
        formData.append("couleur", "vide");
      }
    formData.append("image", this.form.get('image').value);
    
          this.Services.addproduit(formData,{ headers: headers}).subscribe(
            data=>this.handleResponse(data), 
           error=>this.handleError(error)
           );
           
  }
  else 
  {
      if(this.form.get('promo').value !=null)
    {  const headers = new HttpHeaders();
      headers.append('Content-Type', 'multipart/form-data');
      headers.append('Accept', 'application/json');
       formData.append("idUser", this.data.id);
      formData.append("libelle", this.form.get('libelle').value);
      formData.append("description", this.form.get('description').value);
      formData.append("prix", this.form.get('prix').value);
      formData.append("promo", this.form.get('promo').value);
      if(this.couleurs.length!=0)
        { 
          formData.append("couleur",this.couleurs);
        }
          
      else
      {
        formData.append("couleur","vide");
      }
      formData.append("idCategorie", this.form.get('idCategorie').value);
      formData.append("image", this.form.get('image').value);
      
            this.Services.addproduit(formData,{ headers: headers}).subscribe(
              data=>this.handleResponse(data),
              error=>this.handleError(error)
                  );
        
    }
  }
 
 }

 addColor()
 {    
   this.i=this.i+1;
   this.tabi.push(this.i);
    if(this.i != 0 && this.couleurs.length)
      {
        (<HTMLInputElement>document.getElementById('favcolor')).value = null;  
      }
    if( this.i==0 )
      {
        (<HTMLInputElement>document.getElementById('btnAddColor')).disabled=false;
      }
    if( this.i!=0 )
      {
        (<HTMLInputElement>document.getElementById('btnAddColor')).disabled=true; 
      } 
 }

 deleteColor(i)
{
  this.couleurs[0].splice(i, 1);
 console.log(this.couleurs)
}
deleteColortab(i)
{
  this.tab.splice(i, 1);
 console.log(this.tab)
}
 getColor(e)
 { 
 this.eventColor=e.target.value;
  if(this.eventColor != null)
  {
    (<HTMLInputElement>document.getElementById('btnAddColor')).disabled=false; 
  }
  if(this.eventColor == null)
  {
    (<HTMLInputElement>document.getElementById('btnAddColor')).disabled=true;
  }
this.couleurs.push(this.eventColor);
 }
 

 getColorupdate(e)
 { 
   
  
 this.eventColor=e.target.value;
 if(this.eventColor != null)
 {
  this.btn = false;
 }
 
 if(this.eventColor == null  )
 {
   this.btn = true;
 }
this.tab.push(this.eventColor);
if(this.couleurs[0][0]=="vide" && this.couleurs[0].length>1)
  {
  this.couleurs[0]= this.couleurs[0].splice(1,this.couleurs.length) ;

  }
this.eventColor=null;
this.formUpdate.patchValue({
  couleur: this.eventColor
});

 }

 handleResponse(data)
 {   this.nbproduit = this.getnbProdArtisan();
      this.notif.success('Le produit est ajouté avec succès ',{timeout:5000});
      data.couleur = this.couleurs;
      this.produits.push(data);
      this.getProduitPromo();
       this.hideAjouter();      
       this.couleurs = [];
 }
 
 handleError(error)
  {    
       if(error.error.errors.image != null)
         {
              this.notif.error("S'il vous plaît vérifier que vous êtes entré une image (JPG, PNG, GIF,...)",{timeout:4000});
         }
          
 }
 
  showAjouter()
  {
     
    this.contentModal.show();
    
  }
  showDetailProfil()
  {
     
    this.contentprofil.show();
    
  }

  hide(produit)
  {  
    
    this.formUpdate.patchValue({
      libelle:produit.libelle
    });
   
    this.formUpdate.patchValue({
      prix: produit.prix
    }); 
    this.formUpdate.patchValue({
     description: produit.description
    });  
    this.formUpdate.patchValue({
      promo: produit.promo
    });
    this.formUpdate.patchValue({
      idCategorie: produit.idCategorie
    });
  
    this.couleurs = [];
    this.tab=[];
    this.tabi= [];
    this.i=0;
    this.eventColor = "vide";
    this.btn = false ;
    this.formUpdate.reset();
    this.formUpdate.setValidators(null); 
    this.formUpdate.updateValueAndValidity();
  }
  hideAjouter()
  {
    (<HTMLInputElement>document.getElementById('fileAjoutproduit')).value = "";
     
        this.form = this.fb.group({
          idUser:[''],
          description :[''],
          libelle:[''],
          image: [''],
          prix :[''],
          promo:new FormControl(null),
          idCategorie : null ,
          couleur:[[]]
        }); 
        this.fileproduit = '';
        this.tabi= [];
        this.i=0;
        this.couleurs = [];
        (<HTMLInputElement>document.getElementById('btnAddColor')).disabled=false;
        this.contentModal.hide();
   
}

hideDetailProfil()
{
  this.fileuser = '';
  this.contentprofil.hide();
}
user()
{ this.fileuser = '';
  (<HTMLInputElement>document.getElementById('fileModifierUtilisateur')).value = "";
  this.formUser.patchValue({
    nom: this.data.nom
  });
  this.formUser.patchValue({
    prenom: this.data.prenom
  });
 this.formUser.patchValue({
   email: this.data.email
  });
  this.formUser.patchValue({
    datenaiss: this.data.datenaiss
  });
  this.formUser.patchValue({
    adresse: this.data.adresse
  });
  this.formUser.patchValue({
    idGouvernerat: this.data.idGouvernerat
  });
  this.formUser.patchValue({
    domaine: this.data.domaine
  });
  this.formUser.patchValue({
    codePostal: this.data.codePostal
  });
  this.formUser.patchValue({
    tel: this.data.tel
  });
  this.formPassword   = this.fb.group({
  
    actuel: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),    
    pass: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),    

   
   
  });
  this.formUserPassword = this.fb.group({
    nom: new FormControl(null),
    prenom: new FormControl(null),
    email: new FormControl(null),
    datenaiss:  new FormControl(null),
    adresse:  new FormControl(null),
    idGouvernerat: new FormControl(this.gouvernorats2 ),
    domaine:new FormControl(null),
    codePostal: new FormControl(null),
    tel:  new FormControl(null), 
    password: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),
    password_confirmation: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),
    image: new FormControl(null)
   
  });

}
update(index,id,p)
{
  this.id = id;
  this.index = index
  this.p = p;
  this.formUpdate.patchValue({
   libelle: this.p.libelle
 });


 this.formUpdate.patchValue({
   prix: this.p.prix
 }); 
 this.formUpdate.patchValue({
  description: this.p.description
 });  
 this.formUpdate.patchValue({
   promo: this.p.promo
 });
 this.formUpdate.patchValue({
   idCategorie: this.p.idCategorie
 });
 var j = 0;
 this.Services.getProduitByid(this.p.id).subscribe
 ( produit =>{this.pcouleur =  produit;
  var pcol=this.pcouleur[0].couleur;
  var  str =this.pcouleur[0].couleur.replace(/\"/g, "");
  for(var i=0; i<pcol.length;i++)
   {
       if(pcol[i]==",")
       {
         j++;
       
       }
   }
  this.color =str.split(",",j+1);
  
  this.couleurs.push(this.color);
 console.log(this.couleurs)
  if(this.color[0] == "vide")
  {
  
   this.bol =  true ;
  }
  
  this.produits[index].couleur =  this.color;
 
  });
  
 
//this.tColor = this.p.couleur;
this.tab = [];
}

DeletecolorHide()
{
  if(this.p.couleur[0] == 'vide')
  { 
    this.bol = true;
  } 
  else
  {
    this.bol = false;
  }
}

updateProduct(): void{
  var formData: any  = new FormData();
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  formData.append("idUser", this.data.id);
  if(this.formUpdate.get('libelle').value)
 {
  formData.append("libelle", this.formUpdate.get('libelle').value);
 }
 else
 {
  formData.append("libelle", this.p.libelle);
 }
 if(this.formUpdate.get('description').value)
 {
  formData.append("description", this.formUpdate.get('description').value);
 }
 else
 {
  formData.append("description", this.p.description);
 }
 if(this.formUpdate.get('prix').value)
 {
  formData.append("prix", this.formUpdate.get('prix').value);
 }
 else
 {
  formData.append("prix", this.p.prix);
 }
 if(this.formUpdate.get('promo').value)
 {
  formData.append("promo", this.formUpdate.get('promo').value);
 }
 else
 {
  formData.append("promo", this.p.promo);
 }
 

   
if(this.couleurs[0] == "vide" && this.tab.length != 0)
{
this.couleurs = [];
this.couleurs.push(this.tab);

formData.append("couleur", this.couleurs);

}
  
if(this.tab.length != 0)
{
    if(this.p.couleur.length == 0) 
  { 
  this.couleurs = [];
  this.couleurs.push(this.tab);
  formData.append("couleur", this.couleurs);
  
  }

}
 if(this.couleurs[0] == "vide" && this.tab.length != 0)
 {
 
    this.couleurs.push(this.tab);
    formData.append("couleur", this.couleurs);
   
 }
if(this.p.couleur.length != 0 && this.tab.length != 0 && this.p.couleur[0] != "vide")
{
  this.couleurs.push(this.tab);
  
  formData.append("couleur", this.couleurs);
  
}
 if(this.couleurs[0].length == 0 && this.tab.length == 0)
 {
  this.couleurs = ["vide"];
  formData.append("couleur", this.couleurs);
 
 }
 if(this.tab.length == 0 && this.couleurs[0].length !=0 )
 {
 
  formData.append("couleur", this.couleurs);
  
 }
 
 if(this.formUpdate.get('image').value)
 {  

  formData.append("image", this.formUpdate.get('image').value);
 }
 
 if(this.formUpdate.get('idCategorie').value !=this.p.idCategorie)
 {
 
 let tab = Object.values(this.formUpdate.get('idCategorie').value);
 formData.append("idCategorie", tab[0]);
 console.log(tab[0])
  
 }
else
 {
  formData.append("idCategorie",this.p.idCategorie);
 }
 
       this.Services.updateProduit(formData,this.id,{ headers: headers}).subscribe(    
         data=>{
         let tab = Object.values(data);
         this.produits[this.index].libelle = tab[1];
         this.produits[this.index].description = tab[2];
         this.produits[this.index].image = tab[3];
         this.produits[this.index].prix = tab[4];
         this.produits[this.index].promo = tab[5];
         this.produits[this.index].idCategorie=tab[7];
          var j=0;
          var pcol=tab[6];
          var  str =tab[6].replace(/\"/g, "");
        for(var i=0; i<pcol.length;i++)
            {
              
                if(pcol[i]==",")
                {
                  j++;

                }
              
                this.tablecouleur =str.split(",",j+1);
              
              } 
              console.log(this.couleurs)

        this.couleurs.push(this.tablecouleur);
        this.produits[this.index].couleur=   this.couleurs[2];
          if(this.couleurs[2] ==  null)
                {
                    this.produits[this.index].couleur=   this.couleurs[1];
                    
                    console.log(this.couleurs);
                  
                }
    
            this.produitimage = '';
            this.getProduitPromo();
            
            this.hide(this.produits[this.index]);
            },
            error=>this.handleErrorUpdate(error)
                );
}

errorimage = null ;
handleErrorUpdate(error)
{ 
 this.errorimage =  error.error.errors.image ;
    if(error.error.errors.image != null)
  {      
    this.produits[this.index].couleur = this.couleurs;  
    this.contentModif.show();
    this.notif.error("S'il vous plaît vérifier que vous êtes entré une image (JPG, PNG, GIF,...)",{timeout:4000}) 
  }
}

updateUserPassword(): void
{
  var formData: any  = new FormData();
  var formData1: any  = new FormData();
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
 
 
  formData1.append("nom", this.data.nom);

  formData1.append("prenom", this.data.prenom);
  
  formData1.append("email", this.data.email);
  

  formData1.append("datenaiss", this.data.datenaiss);
  
 
  formData1.append("adresse", this.data.adresse);
  
 
  formData1.append("idGouvernerat",this.data.idGouvernerat);
 
  formData1.append("domaine", this.data.domaine);
  formData1.append("codePostal", this.data.codePostal);
 

  formData1.append("tel", this.data.tel);
  formData.append("actuel",   this.formPassword.get('actuel').value);
  formData.append("pass", this.data.password);
  formData1.append("password", this.formUserPassword.get('password').value);
  formData1.append("password_confirmation", this.formUserPassword.get('password_confirmation').value);

 this.Services.VerifierMotDePasse(formData).subscribe(    
  data=>{
    if(data == "valide")
    {
       var datauser : any ;
      if(this.formUserPassword.get('password').value === this.formUserPassword.get('password_confirmation').value )
     { this.Services.updateUser(formData1,this.data.id,{ headers: headers}).subscribe(    
        data=>{
          let tab = Object.values(data);
          this.data.nom = tab[1];
          this.data.prenom = tab[2];
          this.data.adresse = tab[3];
          this.data.domaine = tab[4];
          this.data.datenaiss = tab[5];
          this.data.email = tab[10];
          this.data.tel = tab[9];
          this.data.image = tab[13];
          datauser = {
            id : this.data.id,
            prenom : this.data.prenom,
            image : this.data.image 
          }
         localStorage.setItem("user", JSON.stringify(datauser));
         this.Auth.changedUser(datauser);
          this.notif.success('Vos données sont changées avec succès ',{timeout:5000});
          this.hideDetailProfil();
          this.fileuser = '';
             
        });
      }
      else {
        this.erroruser =  "Mot de passe non identique"
        this.handleErrorUserPassword(this.erroruser);
      }
    }
    else {
      this.erroruser =  "Votre mot de passe actuel incorrect"
      this.handleErrorUserPassword(this.erroruser);
    }
  }
    
             
);
       
        
 
}
handleErrorUserPassword(error){
  this.erroruser  = error;
  this.notif.error(this.erroruser,{timeout:4000});

}
updateUser(): void{
  var formData: any  = new FormData();
  const headers = new HttpHeaders();
  headers.append('Content-Type', 'multipart/form-data');
  headers.append('Accept', 'application/json');
  if(this.formUser.get('nom').value)
 {
  formData.append("nom", this.formUser.get('nom').value);
  
 }

 else
 {
  formData.append("nom", this.data.nom);
  
 }
 if(this.formUser.get('prenom').value)
 {
  formData.append("prenom", this.formUser.get('prenom').value);
  
 }

 else
 {
  formData.append("prenom", this.data.prenom);
  
 }
 if(this.formUser.get('email').value)
 {
  formData.append("email", this.formUser.get('email').value);
  
 }
else
{
  formData.append("email", this.data.email); 
}
 

 if(this.formUser.get('datenaiss').value)
 {
  formData.append("datenaiss", this.formUser.get('datenaiss').value);
  
 }

 else
 {
  formData.append("datenaiss", this.data.datenaiss);
  
 }
 if(this.formUser.get('adresse').value)
 {
  formData.append("adresse", this.formUser.get('adresse').value);
  
 }

 else
 {
  formData.append("adresse", this.data.adresse);
  
 }
 if(this.formUser.get('idGouvernerat').value !=this.data.idGouvernerat)
 {
 let tab = Object.values(this.formUser.get('idGouvernerat').value);
 formData.append("idGouvernerat", tab[0]);
 

 }
  else
  {
    formData.append("idGouvernerat",this.data.idGouvernerat);
  }
 
  
  if(this.formUser.get('domaine').value)
 {
  formData.append("domaine", this.formUser.get('domaine').value);
  
 }

 else
 {
  formData.append("domaine", this.data.domaine);
  
 }
 if(this.formUser.get('codePostal').value)
 {
  formData.append("codePostal", this.formUser.get('codePostal').value);
  
 }

 else
 {
  formData.append("codePostal", this.data.codePostal);
  
 }
 
 if(this.formUser.get('tel').value)
 {
  formData.append("tel", this.formUser.get('tel').value);
  
 }

 else
 {
  formData.append("tel", this.data.tel);
  
 }
 
 
  if(this.formUser.get('image').value)
  { 
    formData.append("image", this.formUser.get('image').value);
  }
               
       var datauser :any ;   
       this.Services.updateUser(formData,this.data.id,{ headers: headers}).subscribe(    
        data=>{
          let tab = Object.values(data);
          this.data.nom = tab[1];
          this.data.prenom = tab[2];
          this.data.adresse=tab[3];
          this.data.domaine = tab[4];
          this.data.datenaiss=tab[5];
          this.data.codePostal=tab[8];
          this.data.email = tab[10];
          this.data.tel = tab[9];
          this.data.idGouvernerat=tab[6]
          this.data.image = tab[13];
          datauser = {
            id : this.data.id,
            prenom : this.data.prenom,
            image : this.data.image 
          }
         localStorage.setItem("user", JSON.stringify(datauser));
         this.Auth.changedUser(datauser);
         this.notif.success('Vos données sont changées avec succès ',{timeout:5000});
         this.hideDetailProfil();
   
        },  error=>this.handleErrorUser(error));
          
        
       
}
handleErrorUser(error)
{ 
  
    if(error.error.errors.email != null)
    { this.errorupdate = "Email existe déja";
     this.notif.error(this.errorupdate,{timeout:4000});
            
  }
    if(error.error.errors.image != null)
    {
      this.notif.error("S'il vous plaît vérifier que vous êtes entré une image (JPG, PNG, GIF,...)",{timeout:4000});
  
    }
   

 
}

file(e){

  this.filedata = e.target.files[0];
  this.formUser.patchValue({
    image: this.filedata
  });
  this.formUser.get('image').updateValueAndValidity();
  this.fileuser  =  this.filedata.name ;
  console.log(this.fileuser.name);
}

getProduitByUser():void{
  var header = {
    headers: new HttpHeaders().set('Authorization',`Bearer ${this.Token.get()}`)
               }
 this.Services.getAuthUser(header).subscribe(data => {
 this.data = data;
 this.Services.getProduitByUser(this.data.id).subscribe
 ( produits => {this.produits=produits;
 var j=0;
 for(var k=0;k<produits.length;k++)
 
 {
   var pcol=produits[k].couleur;
   var  str =produits[k].couleur.replace(/\"/g, "");
   for(var i=0; i<pcol.length;i++)
    {
        if(pcol[i]==",")
        {
          j++;
        
        }
    }
    this.tablecouleur =str.split(",",j+1);
    this.tablecouleurAll.push(this.tablecouleur);
    this.produits[k].couleur = this.tablecouleurAll[k];
  
}
 
});
   }, error => console.error(error));
}
getProduitPromo()
{
   this.Services.getProduitpromo().subscribe
   ( produits => {this.produitspromo=produits,
    this.slides = this.chunk(this.produitspromo, 3);
   });
   
 }

delete(produit:Produit):void
{
    this.Services.deleteProduit(produit.id).subscribe(
    data=>{  this.notif.success('Le produit est supprimé avec succès ',{timeout:5000});
    this.nbproduit = this.getnbProdArtisan();
   });
    this.produits=this.produits.filter(p=>p!==produit);
}

 getCategorie():void
 {
    this.Services.getallCategorie().subscribe
    (categories => (this.categories2=categories));
 }
 getGouvernerat():void
 {
      this.Services.getallGouvernerat().subscribe
      (gouvernerats => (this.gouvernorats2=gouvernerats));
 }
ngOnInit() 
{
  this.getCategorie();
  this.getProduitByUser();
  this.getProduitPromo();
  this.getGouvernerat();
  this.getnbProdArtisan();
  this.getnbCommandeArtisan();

 }
    slides: any = [];
    chunk(arr, chunkSize) 
    {
      let R = [];
      for (let i = 0; i < arr.length; i += chunkSize) {
        R.push(arr.slice(i, i + chunkSize));
      }
      return R;
    }

getnbProdArtisan()
{
  var header = {
    headers: new HttpHeaders().set('Authorization',`Bearer ${this.Token.get()}`)
               }
  this.Services.getAuthUser(header).subscribe(data => {
  this.data = data;
  this.Services.getnbProduitArtisan(this.data.id).subscribe
        (nbprodArtisan => (this.nbprodArtisan=nbprodArtisan));
  }, error => console.error(error));    
}

getnbCommandeArtisan()
{
  var header = {
    headers: new HttpHeaders().set('Authorization',`Bearer ${this.Token.get()}`)
               }
    this.Services.getAuthUser(header).subscribe(data => {
    this.data = data;
    this.Services.getnbCommandeArtisan(this.data.id).subscribe
          (nbcmdArtsian => (this.nbcmdArtsian=nbcmdArtsian));
    }, error => console.error(error));
     
}

showParam()
{
   if(this.hideElementparam==true)
     { 
       document.getElementById("formmodiduser").hidden = false;
       this.hideElementparam=false
     }
      
   else
     {
        document.getElementById("formmodiduser").hidden = true;
       this.hideElementparam=true
     }
}
showpassword()
{
   if(this.hideElementpwd==true)
     { 
       document.getElementById("formmodifpwd").hidden = false;
       this.hideElementpwd=false
     }
      
    else
      { 
        document.getElementById("formmodifpwd").hidden = true;
        this.hideElementpwd=true
      }
}
 //update Password
 get actuel() {return this.formPassword.get('actuel')}
 get  password() {return this.formUserPassword.get('password')}
 get  password_confirmation() {return this.formUserPassword.get('password_confirmation')}
//User
get  nom() {return this.formUser.get('nom')}
get  prenom() {return this.formUser.get('prenom')}
get  datenaiss(){ return this.formUser.get('datenaiss')}
get  email(){ return this.formUser.get('email')}
get  adresse(){ return this.formUser.get('adresse')}
get  domaine(){ return this.formUser.get('domaine')}
get  tel(){ return this.formUser.get('tel')}
get  codePostal() {return this.formUser.get('codePostal')}
get  gouvernorats() {return this.formUser.get('idGouvernerat')}
//Produit
get  libelle() {return this.form.get('libelle')}
get  description() {return this.form.get('description')}
get  prix() {return this.form.get('prix')}
get  image(){ return this.form.get('image')}
get  promo(){ return this.form.get('promo')}
get  idCategorie(){ return this.form.get('idCategorie')}
// update produit
get  libelleupdate() {return this.formUpdate.get('libelle')}
get  descriptionupdate() {return this.formUpdate.get('description')}
get  prixupdate() {return this.formUpdate.get('prix')}
get  imageupdate(){ return this.formUpdate.get('image')}
get  promoupdate(){ return this.formUpdate.get('promo')}
get  idCategorieupdate(){ return this.formUpdate.get('idCategorie')}

}
