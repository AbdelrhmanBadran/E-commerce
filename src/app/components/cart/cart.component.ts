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
  cartOwner :string = ''
  
  ngOnInit(): void {
    this._CartService.getUserCart().subscribe({
      next:res =>{
        this.isLoading = false
        console.log(res)
        this.products = res.data.products
        this.data = res.data
        this.numOfItem = res.numOfCartItems
        this.cartOwner = res.data.cartOwner
        console.log(this.cartOwner);
        
        localStorage.setItem('cartOwner' , this.cartOwner)
      },
      error: err =>{
        this.isLoading = false
        console.log(err)
      } 
    })
  }

  removeCartItem(id:string , $event:any){

    $event.target.children[0].classList.remove('d-none')
    $event.target.children[1].classList.add('d-none')

    console.log(id);
    this.cartBtnLoading = true
    this._CartService.removeCartItem(id).subscribe({
      next: res =>{
        console.log(res);
        this.products = res.data.products
        this.data = res.data
        this.numOfItem = res.numOfCartItems
        this._CartService.numOfProducts.next(res.numOfCartItems)
        this.cartBtnLoading = false
        $event.target.children[0].classList.add('d-none')
        $event.target.children[1].classList.remove('d-none')
      },
      error:err=>{
        console.log(err);
        this.cartBtnLoading = false
        $event.target.children[0].classList.add('d-none')
        $event.target.children[1].classList.remove('d-none')
      }
    })
  }
  

  upadteItem(id:string , count:number , spinner:any , countNumber:any){
    console.log(spinner);
    spinner.classList.remove('d-none')
    countNumber.classList.add('d-none')
    this.updateCountLoading = true
    this._CartService.UpdateItemQ(id,count).subscribe({
      next: res=>{
        console.log(res);
        this.products = res.data.products
        this.updateCountLoading = false
        this.data = res.data
        
      }
    })
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
