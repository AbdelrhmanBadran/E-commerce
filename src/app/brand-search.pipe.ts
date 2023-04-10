import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'brandSearch'
})
export class BrandSearchPipe implements PipeTransform {

  transform(products: any[] , brandTerm:string):any[]{
    return products.filter(product=> product.brand.name.toLocaleLowerCase().includes(brandTerm.toLocaleLowerCase()));
  }

}
