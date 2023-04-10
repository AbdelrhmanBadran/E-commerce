import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit{
  loader:any;

  constructor(private _ProductsService:ProductsService){ }

  ngOnInit(): void {
    this._ProductsService.loader.subscribe({
      next:x=>{
        this.loader = x
        console.log(this.loader);
        
      }
    })
  }
}
