import { ProductsService } from 'src/app/services/products.service';
import { Component, OnInit } from '@angular/core';
import { OwlOptions } from 'ngx-owl-carousel-o';

@Component({
  selector: 'app-owl-categories',
  templateUrl: './owl-categories.component.html',
  styleUrls: ['./owl-categories.component.css']
})
export class OwlCategoriesComponent implements OnInit {

  constructor( private _ProductsService:ProductsService){

  }
  categories:any;
  ngOnInit(): void {
    this._ProductsService.getCategories().subscribe(res=>{
      this.categories = res.data
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
