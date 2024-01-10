import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceSearch'
})
export class PriceSearchPipe implements PipeTransform {

  transform(products:any[] , maxPrice:number): any[] {
    if(maxPrice > 0){
      return products.filter(product => product.price > maxPrice);
    }else{
      return products;
    }
  }
}
