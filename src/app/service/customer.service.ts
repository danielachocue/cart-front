import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Customer } from '../domain/customer';

@Injectable({
  providedIn: 'root'
})
export class CustomerService {

  private url:string=environment.apiUrl+'api/customer/';



  constructor(public httpClient:HttpClient) {}

  createTokenHeader():HttpHeaders{
    let token=localStorage.getItem('token');
    let headers=new HttpHeaders({'Authorization':'Bearer  eyJhbGciOiJIUzI1NiJ9.eyJpYXQiOjE2MDU1NzkyODcsImlzcyI6Imh0dHBzOi8vemF0aHVyYWNvZGUub3JnIiwic3ViIjoiYWRtaW4iLCJleHAiOjE2MDY0NDMyODd9.680UtsxSTWfaQXmm3TdfvmnWOe9B29I4a3m9_ASOQc8'});
    return headers
  }

  public findAll():Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.get(this.url+'findAll', {headers:headers});
  }

  public findById(email:string):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.get(this.url+'findById/'+email, {headers:headers});
  }

  public save(customer:Customer):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.post(this.url+'save',customer, {headers:headers});
  }

  public update(customer:Customer):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.put(this.url+'update',customer, {headers:headers});
  }

  public delete(email:string):Observable<any>{
    let headers=this.createTokenHeader();
    return this.httpClient.delete(this.url+'delete/'+email, {headers:headers});
  }

}
