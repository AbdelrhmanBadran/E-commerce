import { AddHeaderInterceptor } from './add-header.interceptor';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { AboutComponent } from './components/about/about.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import {  FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ProductsComponent } from './components/products/products.component';
import { BrowserAnimationsModule  } from "@angular/platform-browser/animations";
import { OwlCategoriesComponent } from './components/owl-categories/owl-categories.component';
import { OwlBrandComponent } from './components/owl-brand/owl-brand.component';
import { BrandComponent } from './components/brand/brand.component';
import { SearchPipePipe } from './search-pipe.pipe';
import { SeeMorePipe } from './see-more.pipe';
import { BrandSearchPipe } from './brand-search.pipe';
import { PriceSearchPipe } from './price-search.pipe';
import { SingleProductComponent } from './components/single-product/single-product.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishListComponent } from './components/wish-list/wish-list.component';
import { LoaderComponent } from './components/loader/loader.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    LoginComponent,
    RegisterComponent,
    AboutComponent,
    BrandsComponent,
    CartComponent,
    CategoriesComponent,
    NotFoundComponent,
    ProductDetailsComponent,
    ProductsComponent,
    OwlCategoriesComponent,
    OwlBrandComponent,
    BrandComponent,
    SearchPipePipe,
    SeeMorePipe,
    BrandSearchPipe,
    PriceSearchPipe,
    SingleProductComponent,
    CheckOutComponent,
    AllordersComponent,
    WishListComponent,
    LoaderComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule,
    ReactiveFormsModule,
    CarouselModule,
    BrowserAnimationsModule,


  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
