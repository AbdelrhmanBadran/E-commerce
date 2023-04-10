import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-owl-brand',
  templateUrl: './owl-brand.component.html',
  styleUrls: ['./owl-brand.component.css']
})
export class OwlBrandComponent implements OnInit {
  constructor( private _ProductsService:ProductsService){

  }
  brands:any;
  ngOnInit(): void {
    this._ProductsService.getBrands().subscribe(res=>{
      this.brands = res.data
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: true,
    dots: false,
    autoplay:true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 3
      },
      940: {
        items: 7
      }
    },
    nav: true
  }
}
