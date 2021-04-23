import { Component, OnInit } from '@angular/core';
import {ProduitService} from '../Services/produit.service';
import { ServicesService } from '../Services/services.service';
import { TokenService } from '../Services/token.service';
import { AuthService } from '../Services/auth.service';
import { FormBuilder, FormGroup , Validators,FormControl} from "@angular/forms";
import { HttpClient , HttpHeaders } from '@angular/common/http';
import {Message} from "../model/message";

import Echo from 'laravel-echo';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  form: FormGroup;
  message:Message;
  data:any;
  datamsg:any;
  id:any;
  idclient:any;
  bolinput:boolean=false;
  dataAuthuser:any;
  search:string;
  usersmsg:any[];
  messages:any[];
  echo :Echo;
constructor(private token:TokenService, private produitService:ProduitService,
  private route:ActivatedRoute,private  Services: ServicesService,private Token:TokenService 
  ,private Auth:AuthService,public fb: FormBuilder)
{ 
   this.form = this.fb.group({
        idClient:[''],
        idArtisan:[''],
        message :[''],});
}
ngOnInit() 
{
    this.getUserSendMessages();
    this.getmessageuser();
    this.getmessageuser();
    this.setupEvent();
}
getUserSendMessages()
{
  var header = {
    headers: new HttpHeaders().set('Authorization',`Bearer ${this.token.get()}`)
     }
  this.Services.getAuthUser(header).subscribe(data =>
     {
       this.dataAuthuser = data;
      this.Services.getUsersSendmessage(this.dataAuthuser.id).subscribe(users =>
        { 
          this.usersmsg=users.filter(element=>element.id!=this.dataAuthuser.id)
        });
      }, error => console.error(error));
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
onSubmit()
{
    var formData: any = new FormData();
    formData.append("idClient", this.idclient);
    formData.append("idArtisan", this.id);
    formData.append("message", this.form.get('message').value);
    this.Services.sendmessage(formData).subscribe(
           data=>
           {
             this.datamsg=data;
             this.form = this.fb.group({
                idClient:[''],
                idArtisan:[''],
                message :[''],})
           },error=>console.log(error));
}
listene()
{ 
   this.echo.channel('Event')
      .listen('.Event',(e)=>
      {
        //var env=Object.values(e);
       // var t:any[]=env.splice(0,1);
        var ind=e.message.length-1;
       if((this.id == e.message[ind].idClient &&  this.idclient == e.message[ind].idArtisan) || (this.id == e.message[ind].idArtisan &&  this.idclient == e.message[ind].idClient))
        {
          this.messages.push(e.message[ind]);
        }
      });
} 
getmessageuser():void
{
  var header = {
                 headers: new HttpHeaders().set('Authorization',`Bearer ${this.Token.get()}`)
               }
  this.Services.getAuthUser(header).subscribe(data => 
    {
      this.data = data;
      this.Services.getmessage(this.id,this.idclient).subscribe
      ( messages=> {this.messages=messages;});
      }, error => console.error(error));
}
clickMsg(idc)
{
    this.id=this.dataAuthuser.id;
    this.idclient=idc;
    this.bolinput=true;
    this.getmessageuser();
}
}
