import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from './../../services/auth.service';
import { Component } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  constructor(private _AuthService:AuthService , private _Router:Router ) {  }

  isLoading:boolean = false
  errorMsg:string = ''

  registerForm  = new FormGroup({
    name:new FormControl(null ,[Validators.required , Validators.pattern(/^(?:[a-zA-Z0-9\s@,=%$#&_\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF\uFB50-\uFDCF\uFDF0-\uFDFF\uFE70-\uFEFF]|(?:\uD802[\uDE60-\uDE9F]|\uD83B[\uDE00-\uDEFF])){2,20}$/)]  ),
    email:new FormControl(null , [Validators.email , Validators.required]),
    password:new FormControl(null , [Validators.pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/) , Validators.required]),
    rePassword:new FormControl(null , [Validators.pattern(/^[A-Z][a-z]{3,}$/) , Validators.required ]),
    phone:new FormControl(null , [Validators.pattern(/^01[0125][0-9]{8}$/) , Validators.required]),
    }
    ,{validators: this.rePasswordMatched } )

  rePasswordMatched(registerForm:any){
    let passwordControl = registerForm.get('password')
    let rePasswordControl = registerForm.get('rePassword')
    if (passwordControl?.value == rePasswordControl?.value) {
      return null
    }else{
      rePasswordControl?.setErrors({passwordMatch : 'Must match password'})
      return {passwordMatch : 'Must match password'}
    }
  }
  register(registerForm:any){


    if (registerForm.valid) {
      this.isLoading =true
      this._AuthService.register(registerForm.value).subscribe({
        next: res=> {
          if (res.message == 'success') {
            this.isLoading = false
            console.log(res);

            localStorage.setItem( 'userEmail' , registerForm.value.email )
            this._Router.navigate(['/login'])
          }
        },
        error: err=> {
          console.log(err);
          this.isLoading = false
          this.errorMsg = err.error?.message;
          if (err.error.message == 'fail') {
            this.errorMsg = err.error.errors?.msg;
          }else{
            this.errorMsg = err.error.message;
          }
        }
      })
    }
  }
}
