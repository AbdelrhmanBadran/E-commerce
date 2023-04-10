import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from 'src/app/services/products.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-product-details',
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.css']
})

export class ProductDetailsComponent implements OnInit{

    constructor(private _ActivatedRoute:ActivatedRoute , private ProductsService:ProductsService , private _CartService:CartService){
      
    }
    productsDetails:any
    productId:any;
    isLoading:boolean = true
    cartLoading:boolean = false

    ngOnInit(): void {
      this._ActivatedRoute.paramMap.subscribe(res=>{
        console.log(res.get('id'));
        this.productId= res.get('id') 
        
        this.ProductsService.getSpecific(this.productId).subscribe(res=>{
          console.log(res.data);
          console.log(res.data.priceAfterDiscount);
          
          this.productsDetails = res.data
          this.isLoading = false
        })
      })
    }

    customOptions: OwlOptions = {
      loop: true,
      mouseDrag: true,
      touchDrag: true,
      pullDrag: true,
      dots: false,
      navSpeed: 700,
      navText: ['', ''],
      responsive: {
          0: {
              items: 1,
          }
          
      },
      nav: true,
  }


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
