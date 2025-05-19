import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

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

  public addProduct(productData: FormData) { // ✅ Accept only one argument
    return this.http.post(`${this.baseUrl}/ecommerce/product`, productData);
}



  public getProducts(): Observable<any[]> {
    return this.http.get<any[]>(this.baseUrl + '/ecommerce/getallProduct'); // ✅ Add '/'
  }
  
  public deleteByProductId(id:any){
    return this.http.delete(this.baseUrl+`/deletbyid/${id}`)
  }

  // public getById(id:any){
  //   return this.http.get(this.baseUrl+`/deletbyid/${id}`);
  // }


  public updateProduct(uData:any,id:any){
    return this.http.put(this.baseUrl+`/updateCustomer/${id}`,uData);
  }

  addorder(data: any) {
    return this.http.post('http://localhost:4848/postorder', data);
  }

  public addpayment(paymentData:any){
    return this.http.post(this.baseUrl+`/pay`,paymentData)
  }

  public addFeedback(feedbackData:any){
    return this.http.post(this.baseUrl+`/submit`,feedbackData)
  }

  
  //products
  
  public addcloth(productData: FormData) { // ✅ Accept only one argument
    return this.http.post(`${this.baseUrl}//ecommerce/cloth`, productData);
}
  

  // public addProduct(productData: any){
  //   return this.http.post (this.baseUrl + "/ecommerce/product", productData);
  // }

  // public getProducts() {
  //   return this.http.get(this.baseUrl + "ecommerce/getallProduct");
  // }

}
