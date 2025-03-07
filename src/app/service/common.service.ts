import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {



  baseUrl = "http://localhost:4848";

  constructor(private http: HttpClient) {}

  public addUser(userData: any) {
    return this.http.post(this.baseUrl + "/ecommerce/register", userData);
  }

  public getUser() {
    return this.http.get(this.baseUrl + "/ecommerce/getallData");
  }


  // constructor(private http: HttpClient) {}

  // public addUser(userData: any) {
  //   return this.http.post(this.baseUrl + "/ecommerce/register", userData);
  // }

  // public getUser() {
  //   return this.http.get(this.baseUrl + "/ecommerce/getallData");
  // }
}
