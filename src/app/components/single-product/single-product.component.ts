import { Component, OnInit } from '@angular/core';
import { ProductsService } from './../../services/products.service';
import { CartService } from 'src/app/services/cart.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-product',
  templateUrl: './single-product.component.html',
  styleUrls: ['./single-product.component.css']
})
export class SingleProductComponent implements OnInit{

  constructor(private _ProductsService:ProductsService,
    private _CartService:CartService ){  }
  
  isLoading:boolean = true;
  products:any[] = []
  cartLoading:boolean = false
  noItemTosShow:boolean = false;
  cartOwner:any

  ngOnInit(): void {
    
      this._ProductsService.grtProducts().subscribe({
      next: res=> {
        this.isLoading = false;
        // console.log(res.data[0].id);
        
        this.products = res.data
        if (this.products == null) {
          this.noItemTosShow = true;
        }else{
          this.noItemTosShow = false;
        }
        // console.log(res.data);
        
      },
      error: err =>{
        this.isLoading = false;
      },
      complete:()=>{
        // console.log('Done');
        
      }
    })
  }

  searchTitle:string = ''
  searchBrand:string = ''
  searchPrice:any = ''
  
  addToCart(id:string , $event:any){ 
    
    // console.log($event);
    
    $event.target.children[0].classList.remove('d-none')
    $event.target.children[1].classList.add('d-none')
    this.cartLoading = true;

    this._CartService.addToCart(id).subscribe({
      next: res =>
      {
        this.cartLoading = false;
        // console.log(res)
        console.log(res.data);
        $event.target.children[0].classList.add('d-none')
        $event.target.children[1].classList.remove('d-none')

        this._CartService.numOfProducts.next(res.numOfCartItems)
        this.cartOwner = res.data.cartOwner
        console.log(this.cartOwner);
        
        localStorage.setItem('cartOwner' , this.cartOwner)
      },
      error : err => {
        this.cartLoading = false;
        console.log(err)
        $event.target.children[0].classList.add('d-none')
        $event.target.children[1].classList.remove('d-none')
      }
      

      
    })
  }

  addToWishList(id:string , event:any)
  {
    let fillCondition = Array.from(event.target.classList).includes('fa-regular')

    if (fillCondition) {
      this._CartService.addWishList(id).subscribe({
        next:res => {
          console.log(res);
          event.target.classList.replace('fa-regular' , 'fa-solid')
          console.log(event.target);
          this._CartService.numOfwishList.next(res.data.length)
          
        }
      })

    }
    
  }

  removeToWishList(id:string , event:any)
  {
    let fillCondition = Array.from(event.target.classList).includes('fa-solid')

    if (fillCondition) {
      this._CartService.removeWishList(id).subscribe({
        next:res => {
          console.log(res);
          event.target.classList.replace('fa-solid' , 'fa-regular')
          // console.log(event.target);
          this._CartService.numOfwishList.next(res.data.length)
          
        }
      })
    }
    
  }
}
