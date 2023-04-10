import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-allorders',
  templateUrl: './allorders.component.html',
  styleUrls: ['./allorders.component.css']
})
export class AllordersComponent implements OnInit {

  constructor(private _ProductsService:ProductsService){

  }
  isLoading: boolean = true;
  numberOfOrders:number = 0
  numberOfCartItem:any[] = []
  allCarts :any[] = []
  cartid:string | null = localStorage.getItem('cartOwner')

  ngOnInit(): void {
    this._ProductsService.getAllOrders(this.cartid).subscribe({
      next:orders=>{
        console.log(orders);
        this.allCarts = orders
        this.numberOfOrders = orders.length
        orders.forEach((order:any) => {
          this.numberOfCartItem .push(order.cartItems.length)
          // console.log(this.numberOfCartItem);
          
          });
      },
      error: err=> console.log(err),
      complete : ()=>{
        this.isLoading = false
      }
      
    })
  }

}
