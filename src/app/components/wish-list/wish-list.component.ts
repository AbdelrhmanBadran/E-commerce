import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { SplitButtonModule } from 'primeng/splitbutton';
@Component({
  selector: 'app-wish-list',
  templateUrl: './wish-list.component.html',
  styleUrls: ['./wish-list.component.css']
})
export class WishListComponent implements OnInit {
  constructor(private _CartService:CartService){ }

  wishedProducts:any[] = []
  wishCount:number = 0
  cartLoading:boolean = false
  isLoading:boolean = true
  wishTimeOut:any
  ngOnInit(): void {
    this._CartService.getWishList().subscribe({
      next: res=>{
        console.log(res);
        this.wishCount = res.count
        this.wishedProducts = res.data
        this.isLoading = false
      },
      error: err=>{
        console.log(err);
        this.isLoading = false
      }
    })
  }

  removeToWishList(id:string)
  {
  
    console.log(this.wishedProducts);
    // console.log(id);
    this.wishedProducts = this.wishedProducts.filter(wish => wish.id !== id)
    console.log(this.wishedProducts);
    
    this._CartService.numOfwishList.next(this.wishCount - 1)
    clearTimeout(this.wishTimeOut)

    this.wishTimeOut = setTimeout(() => {
      this._CartService.removeWishList(id).subscribe({
        next:res => {
          console.log(res);
          this._CartService.numOfwishList.next(res.data.length)
          
        }
      })
    }, 500);

  }

  addToCart(id:string , $event:any){ 
    $event.target.children[0].classList.remove('d-none')
    $event.target.children[1].classList.add('d-none')
    this.cartLoading = true;

    this._CartService.addToCart(id).subscribe({
      next: res =>
      {
        this.cartLoading = false;
        console.log(res.data);
        $event.target.children[0].classList.add('d-none')
        $event.target.children[1].classList.remove('d-none')
        this._CartService.numOfProducts.next(res.numOfCartItems)
      },
      error : err => {
        this.cartLoading = false;
        console.log(err)
        $event.target.children[0].classList.add('d-none')
        $event.target.children[1].classList.remove('d-none')
      }
    })
  }


}
