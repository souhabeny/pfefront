import { NgModule } from '@angular/core';
import{ RouterModule , Routes} from '@angular/router';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import {ResponseResetComponent} from './password/response-reset/response-reset.component';
import {RequestResetComponent} from './password/request-reset/request-reset.component';
import { DashboredClientComponent } from './dashbored-client/dashbored-client.component';
import { CatalogueComponent } from './catalogue/catalogue.component';
import {ProfilartisanComponent} from './profilartisan/profilartisan.component';
import { AcceuilComponent } from './acceuil/acceuil.component';
import { BeforeLoginService } from './Services/before-login.service';
import { AfterLoginService } from './Services/after-login.service';
import { ShowproduitComponent } from './showproduit/showproduit.component';
import {PanierComponent} from './panier/panier.component';
import { PasscommandComponent } from './passcommand/passcommand.component';
import { ConsultcommandclientComponent } from './consultcommandclient/consultcommandclient.component';
import { ConsultcommandArtisanComponent } from './consultcommand-artisan/consultcommand-artisan.component';
import { ProduitCategorieComponent } from './produit-categorie/produit-categorie.component';
import { ContactComponent } from './contact/contact.component';
import { DevisComponent } from './devis/devis.component';
import { ConsulterDevisComponent } from './consulter-devis/consulter-devis.component';
import { ConsultDevisClientComponent } from './consult-devis-client/consult-devis-client.component';
import { PasserDevisComponent } from './passer-devis/passer-devis.component';

const appRoutes: Routes = [
   { 
    path:'login',
    component: LoginComponent,
    canActivate: [BeforeLoginService]
   },

   {
     path:'catalogue/message',
     component:ContactComponent,
     canActivate: [AfterLoginService]
   },

   {
    path:'Artisan/message',
    component:ContactComponent,
    canActivate: [AfterLoginService]
   },

   {
    path: 'login/signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService]
   },

   {
    path:'panier/passcommand',
    component:PasscommandComponent,
    canActivate: [AfterLoginService]
   },
  
   {
     path:'panier/devis',
     component:DevisComponent,
     canActivate: [AfterLoginService]
   },
   {
    path:'devis/catalogue',
    component:CatalogueComponent,
    
  },

  {
    path:'message',
    component:ContactComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'catalogue/showproduit/:id',
    component:ShowproduitComponent,
  
  },

  {
    path:'catalogue/produitcateg/:id/showproduit/:id',
    component:ShowproduitComponent,
    
  },

 {
    path:'catalogue/produitcateg/:id',
    component:ProduitCategorieComponent,
    
  },

  {
     path:'panier/consultercommandclient',
     component:ConsultcommandclientComponent,
     canActivate: [AfterLoginService]
  },

  {
    path:'Artisan/consultercommandArtisan',
    component:ConsultcommandArtisanComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'panier',
    component:PanierComponent,
    
  },
  {
    path:'Artisan/consulterDevis',
    component: ConsulterDevisComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'panier/consulterDevisClient',
    component: ConsultDevisClientComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'consulterDevisClient/passcommand',
    component:PasserDevisComponent
  },

  {
    path:'panier/passcommand/catalogue',
    component:CatalogueComponent,
    canActivate: [AfterLoginService]
  },

  {
    path:'Artisan',
    component :ProfilartisanComponent,
    canActivate: [AfterLoginService]
  },
  {
    path:'acceuil',
    component : AcceuilComponent,
  
  },

  {
    path:'catalogue',
    component:CatalogueComponent,
   
  },

 {
    path:'panier/catalogue',
    component:CatalogueComponent,
   
 },

 {
      path: 'Client',
      component: DashboredClientComponent ,
      canActivate: [AfterLoginService]
 },
    
 {
    path: 'signup',
    component: SignupComponent,
    canActivate: [BeforeLoginService]
 },
  
 {
    path:'response-reset',
    component: ResponseResetComponent,
    canActivate: [BeforeLoginService]
 },

 {
    path:'login/requestreset',
    component: RequestResetComponent,
    canActivate: [BeforeLoginService]
 } 

];

@NgModule({
  declarations: [],
  imports: [
      RouterModule.forRoot(appRoutes),
          ],
   exports: [RouterModule]
})
export class AppRoutingModule { }
