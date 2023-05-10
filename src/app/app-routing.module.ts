import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { BrandsComponent } from './components/brands/brands.component';
import { CartComponent } from './components/cart/cart.component';
import { CategoriesComponent } from './components/categories/categories.component';
import { AboutComponent } from './components/about/about.component';
import { HomeComponent } from './components/home/home.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { ProductDetailsComponent } from './components/product-details/product-details.component';
import { ProductsComponent } from './components/products/products.component';
import { CheckOutComponent } from './components/check-out/check-out.component';
import { AllordersComponent } from './components/allorders/allorders.component';
import { WishListComponent } from './components/wish-list/wish-list.component';



const routes: Routes = [
  {path:'' ,redirectTo:'home', pathMatch:'full'},
  {path:'home'  , canActivate:[AuthGuard], component:HomeComponent},
  {path:'about'  , canActivate:[AuthGuard],  component:AboutComponent},
  {path:'categories' , canActivate:[AuthGuard], component:CategoriesComponent},
  {path:'cart' ,  canActivate:[AuthGuard], component:CartComponent},
  {path:'brands' , canActivate:[AuthGuard], component:BrandsComponent},
  {path:'products' , canActivate:[AuthGuard], component:ProductsComponent},
  {path:'allorders' , canActivate:[AuthGuard], component:AllordersComponent},
  {path:'checkout/:id/:owner' , canActivate:[AuthGuard], component:CheckOutComponent},
  {path:'wishList' , canActivate:[AuthGuard], component:WishListComponent},
  {path:'prductsDetails/:id' , canActivate:[AuthGuard], component:ProductDetailsComponent},
  {path:'login' , component:LoginComponent},
  {path:'register' , component:RegisterComponent},
  {path:'settings' , loadChildren: ()=> import('./settings/settings.module').then(m=>m.SettingsModule)},
  {path:'**' , component:NotFoundComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes , {useHash:true ,  scrollPositionRestoration: 'enabled'})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
