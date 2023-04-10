import { Component, OnInit } from '@angular/core';
import { CartService } from 'src/app/services/cart.service';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit{
  constructor(private _ProductsService:ProductsService , private _CartService:CartService){

  }
  
  products:any[] = []
  ngOnInit(): void {
    this._ProductsService.getAllProducts().subscribe(res=>{
      
      this.products = res.data
      
    })
  }
  
}
