import { Component, computed, inject, signal } from '@angular/core';
import { UserService } from '../UserService';
import { DashBoardService } from '../service/DashboardService';
import { Router, RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatToolbarModule } from '@angular/material/toolbar';

@Component({
  selector: 'app-layout-component',
  standalone: false,
  templateUrl: './layout-component.component.html',
  styleUrl: './layout-component.component.css'
})
export class LayoutComponentComponent {

  // Creating a signal to store the state of the collapse
  collapsed = signal(false)

  sidenavWidth = computed(() => this.collapsed()? '65px' : '250px')


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
