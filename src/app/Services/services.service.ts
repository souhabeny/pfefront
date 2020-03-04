import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ServicesService {
private baseUrl ='http://localhost:8000/api';
  constructor(private http: HttpClient)
   { 

   }
   signup(data,Headers)
   {
    return  this.http.post(`${this.baseUrl}/signup`,data,Headers);
   }
   signupAdmin(data)
   {
    return  this.http.post(`${this.baseUrl}/signupAdmin`,data);
   }
   login(data)
   {
    return  this.http.post(`${this.baseUrl}/login`,data) ; 
   }
   Image()
   {
    return  this.http.get(`${this.baseUrl}/Image`) ; 
   }
   sendPasswordResetLink(data)
   {
    return this.http.post(`${this.baseUrl}/sendPasswordReset`,data)  ;
   }
   changePassword(data)
   {
    return this.http.post(`${this.baseUrl}/responsepasswordreset`,data)  ;
   }
  me(data)
   {
    return this.http.post(`${this.baseUrl}/me`,data)  ;
   }
   details(data,Headers)
   {
    return this.http.post(`${this.baseUrl}/details`,data,Headers)  ;
   }
   
}
