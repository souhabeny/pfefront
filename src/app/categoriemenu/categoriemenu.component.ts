import { Component, OnInit } from '@angular/core';
import {Categorie} from '../model/categorie';
import { ServicesService } from '../Services/services.service';

@Component({
  selector: 'app-categoriemenu',
  templateUrl: './categoriemenu.component.html',
  styleUrls: ['./categoriemenu.component.scss']
})
export class CategoriemenuComponent implements OnInit {

  categories2: Categorie[];

constructor(private  Services: ServicesService) {}
  
ngOnInit() 
{
    this.getCategorie();
}

getCategorie():void
{
    this.Services.getallCategorie().subscribe(categories => (this.categories2=categories));
}

}
