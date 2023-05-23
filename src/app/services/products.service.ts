import { Observable, BehaviorSubject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  loader = new BehaviorSubject(false)
  constructor(private _HttpClient:HttpClient) { }
  baseUrl:string = 'hhttps://ecommerce.routemisr.com/api/v1'
  grtProducts(): Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/products`)
  }
  getSpecific(prdoductId:any):Observable<any>
  {
  return this._HttpClient.get(`${this.baseUrl}/products/${prdoductId}`)
  }
  getAllProducts() :Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/products`)
  }
  getCategories() :Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/categories`)
  }
  getBrands() :Observable<any>{
    return this._HttpClient.get(`${this.baseUrl}/brands`)
  }
  getAllOrders(cartId:any):Observable<any>
  {
    return this._HttpClient.get(`${this.baseUrl}/orders/user/${cartId}`)
  }

}

