import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor() { }

  signIn(user:any){
    sessionStorage.setItem("admin",user);
  }
}
