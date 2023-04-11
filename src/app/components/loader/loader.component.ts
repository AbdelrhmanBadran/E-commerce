import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ProductsService } from 'src/app/services/products.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit{
  
  constructor(private _ProductsService:ProductsService){ }
  loader:Subject<boolean> = this._ProductsService.loader
  ngOnInit(): void {
    
  
  }
}
