import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../UserService';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-forget-password',
  standalone: false,
  templateUrl: './forget-password.component.html',
  styleUrl: './forget-password.component.css'
})
export class ForgetPasswordComponent implements OnInit {

    private fb = inject(FormBuilder)
    private userSvc = inject(UserService)
    private forgetPasswordSub!: Subscription

    protected form!: FormGroup


    ngOnInit():void {

      this.form = this.createForm()

    }

    createForm():FormGroup {
      return this.fb.group({
        email: this.fb.control<string>("", [Validators.required, Validators.email])
      })
    }


    processForm():void {

      const email = this.form.controls["email"]?.value

      console.info("your email that you want to reset is ", email)

      //Send to service 
      this.forgetPasswordSub = this.userSvc.forgotPassword(email).subscribe({
        next: (response)=>{
          console.info("This is your response ", response)
        }, 
        error: (error)=>{
          console.info("this is your error", error)
        }
      })
    }


}
