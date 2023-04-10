import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchPipe'
})
export class SearchPipePipe implements PipeTransform {

  transform(products:any[] , serachitem:string): any[] {
    return products.filter(product => product.title.toLocaleLowerCase().includes(serachitem.toLocaleLowerCase()))
  }

}
