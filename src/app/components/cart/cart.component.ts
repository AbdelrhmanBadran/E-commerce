import { Component, EventEmitter, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit{

  constructor( private _CartService:CartService){ }

  isLoading:boolean = true;
  products:any[] = []
  numOfItem:number = 0;
  data:any;
  cartBtnLoading:boolean = false;
  updateCountLoading:boolean = false;
  
  counter:any;
  remove:any;
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next:res =>{
        this.isLoading = false
        console.log(res)
        this.products = res.data.products
        this.data = res.data
        this.numOfItem = res.numOfCartItems
      },
      error: err =>{
        this.isLoading = false
        console.log(err)
      } 
    })
  }

  removeCartItem(id:string ){

  
  console.log(this.products);
  this.products = this.products.filter(pro=> (pro.product._id != id))

    this.cartBtnLoading = true


    clearTimeout(this.remove)
    this.remove = setTimeout(() => {
      this._CartService.removeCartItem(id).subscribe({
        next: res =>{
          console.log(res);
          this.products = res.data.products
          this.data = res.data
          this.numOfItem = res.numOfCartItems
          this._CartService.numOfProducts.next(res.numOfCartItems)
          this.cartBtnLoading = false
        },
        error:err=>{
          console.log(err);
          this.cartBtnLoading = false
        }
      })
    }, 500);
  }


  upadteItem(id:string , count:number ){
    
    if(count ==0){
      this.removeCartItem(id)
    }else{
      clearTimeout(this.counter)
      this.counter = setTimeout(() => {
        this._CartService.UpdateItemQ(id,count).subscribe({
          next: res=>{
            console.log(res);
            this.products = res.data.products
            this.updateCountLoading = false
            this.data = res.data
            
          }
        })
    
      }, 500);  
    
    }
  }

  
  clear:boolean =false
  
  clearCartItems(){
    this.clear = true
    this._CartService.clearCartItems().subscribe(
      res=>{
        console.log(res);
        this.products = []
        this.numOfItem = 0
        this.data = null;
        this.clear = false
        this._CartService.numOfProducts.next(0)

      
    })
  }

  
}
