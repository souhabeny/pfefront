
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';

import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { LoginComponent } from './login/login.component';

import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { SignupComponent } from './signup/signup.component';

import { ResponseResetComponent } from './password/response-reset/response-reset.component';
import { RequestResetComponent } from './password/request-reset/request-reset.component';
import { TokenService } from './Services/token.service';
import { AuthService } from './Services/auth.service';
import { AfterLoginService } from './Services/after-login.service';
import { BeforeLoginService } from './Services/before-login.service';
import { SnotifyModule, SnotifyService, ToastDefaults } from 'ng-snotify';
import { ServicesService } from './Services/services.service';

import { DashboredClientComponent } from './dashbored-client/dashbored-client.component';

import { CatalogueComponent } from './catalogue/catalogue.component';
import { ProfilartisanComponent } from './profilartisan/profilartisan.component';
import { NotifierModule, NotifierOptions } from 'angular-notifier';

import { AcceuilComponent } from './acceuil/acceuil.component';
import { ShowproduitComponent } from './showproduit/showproduit.component';
import { PanierComponent } from './panier/panier.component';

import { PasscommandComponent } from './passcommand/passcommand.component';
import {produitFilter} from './produitFilter.pipe';
import {prixFiltermin} from './prixfiltermin.pipe';
import {prixFiltermax} from './prixfiltermax.pipe';
import {CategorieFilter} from './categoriefilter.pipe';
import {DateFilter} from './datefilter.pipe';
import {UserFilter} from './userfilter.pipe';
import { from } from 'rxjs';
import { ConsultcommandclientComponent } from './consultcommandclient/consultcommandclient.component';
import { ConsultcommandArtisanComponent } from './consultcommand-artisan/consultcommand-artisan.component';
import { ProduitCategorieComponent } from './produit-categorie/produit-categorie.component';
import { CategoriemenuComponent } from './categoriemenu/categoriemenu.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { ContactComponent } from './contact/contact.component';
import { PaginationComponent } from './pagination/pagination.component';
import { DevisComponent } from './devis/devis.component';
import { ConsulterDevisComponent } from './consulter-devis/consulter-devis.component';
import { ConsultDevisClientComponent } from './consult-devis-client/consult-devis-client.component';
import { PasserDevisComponent } from './passer-devis/passer-devis.component';




@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    LoginComponent,
    
    SignupComponent,
    
    ResponseResetComponent,
    RequestResetComponent,
   
    
    DashboredClientComponent,
    CatalogueComponent,
    ProfilartisanComponent,
  
    AcceuilComponent,
    ShowproduitComponent,
    PanierComponent,
    
    PasscommandComponent,
    produitFilter,
    prixFiltermin,
    prixFiltermax,
    CategorieFilter,
    DateFilter,
    UserFilter,
   
    ConsultcommandclientComponent,
    ConsultcommandArtisanComponent,
    ProduitCategorieComponent,
    CategoriemenuComponent,
    ContactComponent,
    PaginationComponent,
    DevisComponent,
    ConsulterDevisComponent,
    ConsultDevisClientComponent,
    PasserDevisComponent,
   
    
    
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MDBBootstrapModule.forRoot(),
    FormsModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    SnotifyModule,
    NgxPaginationModule
  ],
  
  providers: [ServicesService,TokenService,AuthService,AfterLoginService,BeforeLoginService,
    { provide: 'SnotifyToastConfig', useValue: ToastDefaults},
    SnotifyService],
  bootstrap: [AppComponent]
})
export class AppModule { }
