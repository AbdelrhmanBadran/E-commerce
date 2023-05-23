import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CartService } from 'src/app/services/cart.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  constructor(private _AuthService:AuthService , private _Router:Router , private CartService:CartService){   }

  isLoading:boolean = false
  errorMsg:string = ''
  userEmail:string = JSON.stringify(localStorage.getItem('userEmail')).slice(1,-1)

  loginForm:FormGroup = new FormGroup({
    email: new FormControl( this.userEmail  , [Validators.required , Validators.email]),
    password: new FormControl(null , [Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) , Validators.required])
  })

  handleLogIn(loginForm:FormGroup){
    this.isLoading = true;
    if (this.loginForm.valid) {
      this._AuthService.logIn(this.loginForm.value).subscribe({
        next:res=>{
          console.log(res);
          localStorage.setItem('userToken' , res.token )
          this.isLoading = false;
        },
        error:err=>{
          console.log(err);
          this.isLoading = false;
          this.errorMsg = err.error.message

        }
      })
    }

  }
}


