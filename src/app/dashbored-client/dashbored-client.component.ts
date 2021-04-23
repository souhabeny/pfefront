import { Component, OnInit,ViewChild } from '@angular/core';
import {Router} from '@angular/router';
import {HttpHeaders} from '@angular/common/http';
import { ServicesService } from '../Services/services.service';
import { TokenService } from 'src/app/Services/token.service';
import {Produit} from '../model/produit';
import { FormsModule }   from '@angular/forms';
import {Gouvernerat} from '../model/gouvernerat';
import Echo from 'laravel-echo';
import { AuthService } from 'src/app/Services/auth.service';
import { FormBuilder, FormGroup , Validators,FormControl} from "@angular/forms";
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';

@Component({
  selector: 'app-dashbored-client',
  templateUrl: './dashbored-client.component.html',
  styleUrls: ['./dashbored-client.component.scss']
})
export class DashboredClientComponent implements OnInit {
  
  @ViewChild('contentprofil', { static: true }) public contentprofil;
  
  formUser: FormGroup;
  formUserPassword : FormGroup;
  formPassword : FormGroup;
  formLike: FormGroup;
  produits: Produit[];
  gouvernorats2 :Gouvernerat[];
  nblikes= [];
  nbdislikes:any[]=[];
  nbdislike:any;
  existlike:any[]=[];
  existdislike:any[]=[];
  islike:boolean[]=[];
  data:any;
  p1 : any;
  index : any;
  env1:any;
  filedata:any;
  nbAchat:any;
  ilike:any;
  idislike:any;
  dataAuthuser:any;
  erroruser:any; 
  errorupdate = null;
  user1 =null;
  fileuser = null ;
  echo :Echo;
  hideElementparam: boolean =true;
  hideElementpwd: boolean =true;
constructor (private token:TokenService ,public notif : SnotifyService,private Auth:AuthService, private Services:ServicesService, private router:Router,public fb: FormBuilder,)
{ 
    var header = {
      headers: new HttpHeaders().set('Authorization',`Bearer ${this.token.get()}`)
                 }
      this.Services.getAuthUser(header).subscribe(data =>
      {   
        this.data = data ;
    
      },error => console.error(error));

      this.user1 =  this.data ;
                 
      this.formLike = this.fb.group
      ({
        user_id: [''],
        produit_id: [''],
        like:[''],
      }); 
    
      this.formUser = this.fb.group
      ({
      nom: new FormControl(null),
      prenom: new FormControl(null),
      email: new FormControl(null,[Validators.email]),
      datenaiss:  new FormControl(null),
      adresse:  new FormControl(null),
      idGouvernerat: new FormControl(this.gouvernorats2 ),
      codePostal: new FormControl(null, [Validators.minLength(4),Validators.maxLength(4)]),
      tel:  new FormControl(null, [Validators.minLength(8),Validators.maxLength(8)]),     
      password: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),
      password_confirmation: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),
      image: new FormControl(null)
      
    });
    this.formUserPassword = this.fb.group
    ({
      nom: new FormControl(null),
      prenom: new FormControl(null),
      email: new FormControl(null),
      datenaiss:  new FormControl(null),
      adresse:  new FormControl(null),
      idGouvernerat: new FormControl(this.gouvernorats2 ),
      codePostal: new FormControl(null),
      tel:  new FormControl(null), 
      password: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),
      password_confirmation: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),
      image: new FormControl(null)
      
    });
    this.formPassword   = this.fb.group
    ({
      actuel: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),    
      pass: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),    
      
    });
  }
  
getProduits():void
{
  this.user1 = JSON.parse(localStorage.getItem('user'));
  this.Services.getproduitOrderByDate().subscribe
      (produits =>
        {
           this.produits=produits;
       
           for(let i=0;i<this.produits.length;i++)
                {
                  this.Services.countlikes(this.produits[i].id).subscribe
                        (nblike=> 
                          {
                                    this.nblikes.push(nblike);
                                    this.Services.existlikes(this.user1.id,this.produits[i].id).subscribe(
                                    existlike=>
                                    {this.existlike[i]=existlike;
                                      if(this.existlike[i].length>0)
                                        { 
                                            document.getElementById("btnlike"+i).style.color = "blue";
                                            (<HTMLInputElement> document.getElementById("btnlike"+i)).disabled = true;
                                            (<HTMLInputElement> document.getElementById("btndislike"+i)).disabled = false;
                                          
                                        }
                                     })
                         }); 
                  this.Services.countdislikes(this.produits[i].id).subscribe
                        (nbdislike=> 
                          {this.nbdislikes.push(nbdislike),
                              this.Services.existdislikes(this.user1.id,this.produits[i].id).subscribe(
                                existdislike=>
                                {
                                  this.existdislike[i]=existdislike
                                    if(this.existdislike[i].length>0)
                                      {
                                        document.getElementById("btndislike"+i).style.color = "red";
                                        (<HTMLInputElement> document.getElementById("btndislike"+i)).disabled = true;
                                        (<HTMLInputElement> document.getElementById("btnlike"+i)).disabled = false;
                                      }
                                 })
                           }
                         );
                }
        });
}
getGouvernerat():void
{
 this.Services.getallGouvernerat().subscribe
 (gouvernerats => (this.gouvernorats2=gouvernerats));
     
}
     
file(e)
{
 this.filedata = e.target.files[0];
 this.formUser.patchValue({
          image: this.filedata});
 this.formUser.get('image').updateValueAndValidity();
 this.fileuser  =  this.filedata.name ;

}
get actuel() {return this.formPassword.get('actuel')}
get  password() {return this.formUserPassword.get('password')}
get  password_confirmation() {return this.formUserPassword.get('password_confirmation')}
     
get  nom() {return this.formUser.get('nom')}
get  prenom() {return this.formUser.get('prenom')}
get  datenaiss(){ return this.formUser.get('datenaiss')}
get  email(){ return this.formUser.get('email')}
get  adresse(){ return this.formUser.get('adresse')}
get  tel(){ return this.formUser.get('tel')}
get  codePostal() {return this.formUser.get('codePostal')}
get  gouvernorats() {return this.formUser.get('idGouvernerat')}

user()
{ 
 (<HTMLInputElement>document.getElementById('fileModifierUtilisateur')).value = "";
 this.fileuser=null;
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
    codePostal: this.data.codePostal
  });
  this.formUser.patchValue({
    tel: this.data.tel
  });
 
  this.formPassword   = this.fb.group
  ({
     actuel: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),    
    pass: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),    
   });
  this.formUserPassword = this.fb.group
  ({
    nom: new FormControl(null),
    prenom: new FormControl(null),
    email: new FormControl(null),
    datenaiss:  new FormControl(null),
    adresse:  new FormControl(null),
    idGouvernerat: new FormControl(this.gouvernorats2 ),
    codePostal: new FormControl(null),
    tel:  new FormControl(null), 
    password: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),
    password_confirmation: new FormControl(null, [Validators.minLength(8),Validators.maxLength(20)]),
    image: new FormControl(null)
   });
   

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
  formData1.append("codePostal", this.data.codePostal);
  formData1.append("tel", this.data.tel);
  formData.append("actuel",   this.formPassword.get('actuel').value);
  formData.append("pass", this.data.password);
  formData1.append("password", this.formUserPassword.get('password').value);
  formData1.append("password_confirmation", this.formUserPassword.get('password_confirmation').value);
  var datauser :any ;
    this.Services.VerifierMotDePasse(formData).subscribe(    
     data=>
     {
       if(data == "valide")
       { 
          if(this.formUserPassword.get('password').value === this.formUserPassword.get('password_confirmation').value )
          { 
          this.Services.updateUser(formData1,this.data.id,{ headers: headers}).subscribe(    
            data=>
            {
              let tab = Object.values(data);
              this.data.nom = tab[1];
              this.data.prenom = tab[2];
              this.data.adresse=tab[3];
              this.data.datenaiss=tab[5];
              this.data.idGouvernerat = tab[6];
              this.data.codePostal=tab[8];
              this.data.tel = tab[9];
              this.data.email = tab[10];
              this.data.image = tab[13];
              datauser = {
                id : this.data.id,
                prenom : this.data.prenom,
                image : this.data.image 
              }
             localStorage.setItem("user", JSON.stringify(datauser));
            
              this.notif.success('Vos données sont changées avec succès ',{timeout:5000});
              this.hideDetailProfil();
            });
          }
          else 
          {
            this.erroruser =  "Mot de passe non identique"
            this.handleErrorUserPassword(this.erroruser);
          }
        }
       else 
        {
            this.erroruser =  "Votre mot de passe actuel incorrect"
            this.handleErrorUserPassword(this.erroruser);
        }
     });
}

handleErrorUserPassword(error)
{
  this.erroruser  = error;
  this.notif.error(this.erroruser,{timeout:4000});

}

hideDetailProfil()
{
   this.contentprofil.hide();
}

updateUser(): void
{
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

     if(this.formUser.get('idGouvernerat').value !=this.data.idGouvernerat )
      {
          let tab = Object.values(this.formUser.get('idGouvernerat').value);
          formData.append("idGouvernerat", tab[0]);
      }
      else
      {
        formData.append("idGouvernerat",this.data.idGouvernerat);
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
     var datauser : any ;
     this.Services.updateUser(formData,this.data.id,{ headers: headers}).subscribe(    
        data=>
        {
          let tab = Object.values(data);
          this.data.nom = tab[1];
          this.data.prenom = tab[2];
          this.data.adresse=tab[3];
          this.data.datenaiss=tab[5];
          this.data.idGouvernerat = tab[6];
          this.data.codePostal=tab[8];
          this.data.tel = tab[9];
          this.data.email = tab[10];
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
   
        }, error=>this.handleErrorUser(error));
       
}

handleErrorUser(error)
{ 
    if(error.error.errors.email != null)
    { 
      this.errorupdate = "Email existe déja";
      this.notif.error(this.errorupdate,{timeout:4000});
    }
    if(error.error.errors.image != null)
    {
      this.notif.error("S'il vous plaît vérifier que vous êtes entré une image (JPG, PNG, GIF,...)",{timeout:4000});
    }
}
   
setupEvent()
{
  this.echo=new Echo({
        broadcaster: 'socket.io',
        host:'http://localhost:6001',
      });
  window['echo']=this.echo;
  this.listene(); 
}
  
setupEventdl()
{
  this.echo=new Echo({
        broadcaster: 'socket.io',
        host:'http://localhost:6001',
      });
  window['echo']=this.echo;
  this.listendislike();
    
}
   
listendislike()
{ 
  this.echo.channel('dislikeEvent')
       .listen('.dislikeEvent',(e)=>
       {
        
        this.nbdislikes.splice(e.posd, 1,e.dislike);
        this.Services.countlikes(e.pd).subscribe(nblike=>
            {
              this.nblikes.splice(e.posd, 1,nblike);
            });
       });
} 
  
addlike(idprod,i)
{ 
  var formData: any = new FormData();
  formData.append("user_id", this.user1.id);
  formData.append("produit_id", idprod);
       this.Services.addlike(formData,i).subscribe(    
         data=>
         {

           document.getElementById("btnlike"+i).style.color = "blue";
           document.getElementById("btndislike"+i).style.color = "black";
           (<HTMLInputElement> document.getElementById("btnlike"+i)).disabled = true;
           (<HTMLInputElement> document.getElementById("btndislike"+i)).disabled = false;
            this.Services.deletedislike(idprod,this.user1.id).subscribe(data=>console.log(data))
          });
}

listene()
{  
    this.echo.channel('likeEvent')
       .listen('.likeEvent',(e)=>
       {
     
       this.nblikes.splice(e.pos, 1,e.like);
       this.Services.countdislikes(e.pl).subscribe(nbdislike=>
       {
        this.nbdislikes.splice(e.pos, 1,nbdislike);
        
       });
     
      });
} 
   
adddislike(idprod,i)
{ 
       var formData: any = new FormData();   
       formData.append("user_id", this.user1.id);
       formData.append("produit_id", idprod);
       this.Services.addDislike(formData,i).subscribe(    
         data=>
         {
           document.getElementById("btndislike"+i).style.color = "red";
           document.getElementById("btnlike"+i).style.color = "black";
           (<HTMLInputElement> document.getElementById("btnlike"+i)).disabled = false;
           (<HTMLInputElement> document.getElementById("btndislike"+i)).disabled = true;
           this.Services.deletelike(idprod,this.user1.id).subscribe(data=>console.log(data));
         });
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
   
getnbAchat()
{ 
     this.user1 = JSON.parse(localStorage.getItem('user'));
     this.Services.nbAchatClient(this.user1.id).subscribe(
            nbAchat=>{this.nbAchat=nbAchat}) 
        
}
     
ngOnInit() 
{
   this.getProduits();
   this.getGouvernerat();
   this.setupEvent();
   this.setupEventdl();
   this.getnbAchat();
}


}
