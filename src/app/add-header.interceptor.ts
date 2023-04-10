import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpEventType
} from '@angular/common/http';
import { Observable, tap } from 'rxjs';
import { ProductsService } from './services/products.service';

@Injectable()
export class AddHeaderInterceptor implements HttpInterceptor {

  constructor(private _ProductsService:ProductsService) {}
  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    
    

    let modifiedReq =  request.clone({

      headers:request.headers.set('token' , localStorage.getItem('userToken')|| '' )

    })
    
    
    return next.handle(modifiedReq).pipe(tap(event=>{
      this._ProductsService.loader.next(true)
      if (event.type == HttpEventType.Response) {
        if (event.status == 200) {
          this._ProductsService.loader.next(false)
        }
      }
    }))
    
  }
}
