import { Component, OnInit } from '@angular/core';
import { FormBuilder } from "@angular/forms";
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  constructor() { }

  oppoSuits: any = ['Men', 'Women', 'Boys', 'Inspiration']

 
  ngOnInit() {
   
    }

}
