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
  ngOnInit(): void {
    this._CartService.getWishList().subscribe({
      next: res=>{
        console.log(res);
        this.wishCount = res.count
        this.wishedProducts = res.data
        
      },
      error: err=>{
        console.log(err);
        
      }
    })
  }

  removeToWishList(id:string , event:any )
  {
    event.target.parentElement.classList.add('disabled') 
    event.target.parentElement.innerHTML = `<i class="fa-regular fa-circle-check"></i>`

    // event.target.parentElement.classList.add('disabled')

      this._CartService.removeWishList(id).subscribe({
        next:res => {
          console.log(res);
          this._CartService.numOfwishList.next(res.data.length)
          this._CartService.numOfProducts.subscribe({
            next: x =>{
              this.wishCount = x
            }
          })
          if (res.data.length == 0) {
            this.wishedProducts = []
          }
        }
      })
    
    
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
