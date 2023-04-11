import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {

  numOfProducts = new BehaviorSubject(0)
  numOfwishList = new BehaviorSubject(0)
  userToken = new BehaviorSubject(null || '')
  headers:any 
  
  constructor(private _HttpClient:HttpClient) { 
    this.userToken.next(JSON.parse(JSON.stringify(localStorage.getItem('userToken'))))
    
    this.userToken.subscribe({
      next: (x) => {  
        this.headers = x 
        // console.log(this.headers);
        this.getUserCart().subscribe({
          next:res => this.numOfProducts.next(res.numOfCartItems)
          
        })
        this.getWishList().subscribe({
          next:res => this.numOfwishList.next(res.count)
          
        })
      }
    })

    

  }

  addToCart(Id:string):Observable<any>
  {
    console.log(this.headers);
    return this._HttpClient.post('https://route-ecommerce.onrender.com/api/v1/cart' , 
    {productId:Id}
    )
    
  }

  getUserCart():Observable<any>
  {

    return this._HttpClient.get('https://route-ecommerce.onrender.com/api/v1/cart')
  }
  
  removeCartItem(id:string):Observable<any>
  {
    return this._HttpClient.delete(`https://route-ecommerce.onrender.com/api/v1/cart/${id}` )
  }

  clearCartItems():Observable<any>
  {
    return this._HttpClient.delete(`https://route-ecommerce.onrender.com/api/v1/cart` )
  }

  UpdateItemQ(id:string , count:number):Observable<any>
  {
    return this._HttpClient.put(`https://route-ecommerce.onrender.com/api/v1/cart/${id}`, {count:count} )
  }

  onlinePayement(cartId:string , shippingAddress:any):Observable<any>
  {
    return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/orders/checkout-session/${cartId}/?url=http://localhost:4200` , 
    {
      shippingAddress: shippingAddress
    })
  }

  addWishList(productId:string):Observable<any>
  {
    return this._HttpClient.post(`https://route-ecommerce.onrender.com/api/v1/wishlist` ,{productId : productId}  )
  }

  removeWishList(productId:string):Observable<any>
  {
    return this._HttpClient.delete(`https://route-ecommerce.onrender.com/api/v1/wishlist/${productId}` )
  }

  getWishList():Observable<any>
  {
    return this._HttpClient.get(`https://route-ecommerce.onrender.com/api/v1/wishlist` )
  }
}
