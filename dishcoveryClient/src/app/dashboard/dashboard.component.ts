import { Component, inject, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from '../UserService';
import { Router } from '@angular/router';
import { DashBoardService } from '../service/DashboardService';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy{

    protected userSvc = inject(UserService)
    protected dashBoardSvc = inject(DashBoardService)
    protected router = inject(Router)
    protected username: string = ""

    protected tokenSub!: Subscription
    
    protected responseSub!:Subscription

      ngOnInit():void{

        // Get the username in localstorage
        this.username = localStorage.getItem('username') as string
        
        // Check token from localStorage
        console.log('Token from localStorage:', localStorage.getItem('jwtToken'));

        // See example response
        this.responseSub = this.dashBoardSvc.getResponse().subscribe({
          next: (response) => {
            console.info("your response is ", response)
          }
        })

      }

      logout():void{
        localStorage.removeItem("jwtToken")
        this.router.navigate(["/"])
      }


      ngOnDestroy():void{
        
      }
}
