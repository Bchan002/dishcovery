import { Component, HostListener, inject } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { filter, map } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { UserService } from '../service/UserService';
import { NotificationService } from '../service/NotificationService';

@Component({
  selector: 'app-main-layout',
  standalone: false,
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  protected username: string = '';
  protected pageTitle: string = 'Dishcovery';
  protected sidebarCollapsed: boolean = false;
  protected isMobileView: boolean = false;
  protected sidebarOpen: boolean = true;
  protected isDarkTheme: boolean = false;
  protected recipeDropdownOpen: boolean = false;
  protected groceryListDropdownOpen: boolean = false;

  protected notifications: any[] = []

  private notificationSvc = inject(NotificationService)
  private router = inject(Router)

  constructor(
  ) {
    this.checkScreenSize();
  }

  ngOnInit(): void {
    // Get the username from localStorage
    this.username = localStorage.getItem('username') || '';
    
    // Set initial sidebar state based on screen size
    if (this.isMobileView) {
      this.sidebarCollapsed = false; // Ensure full menu opens
      this.sidebarOpen = true;
    }

    this.notificationSvc.notification$.subscribe( (notificaions)=> {
      this.notifications = notificaions;
    })

     // Request permission and listen for notifications
     this.notificationSvc.requestPermission();
     this.notificationSvc.listenForMessages();

  }

  ngOnActivate(): void {
    this.notificationSvc.notification$.subscribe( (notificaions)=> {
      this.notifications = notificaions;
    })

     // Request permission and listen for notifications
     this.notificationSvc.requestPermission();
     this.notificationSvc.listenForMessages();
  }

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.checkScreenSize();
  }

  checkScreenSize() {
    this.isMobileView = window.innerWidth < 992;
    if (this.isMobileView) {
      this.sidebarCollapsed = true;
      this.sidebarOpen = false;
    } else {
      this.sidebarOpen = true;
    }
  }

  toggleSidebar() {
    this.sidebarCollapsed = !this.sidebarCollapsed;
  
    if (this.sidebarCollapsed) {
      this.recipeDropdownOpen = false;
    }
  }

  toggleMobileSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }


  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    document.body.classList.toggle('dark-theme', this.isDarkTheme)
  }

  logout() {
    localStorage.removeItem('jwtToken')
    localStorage.removeItem('username')
    this.router.navigate(['/'])
  }

  toggleRecipeDropdown() {
    this.recipeDropdownOpen = !this.recipeDropdownOpen
  
    // Ensure sidebar is open in mobile mode
    if (this.isMobileView) {
      this.sidebarOpen = true;
    }
  }

  toggleGroceryDropdown() {
    this.groceryListDropdownOpen = !this.groceryListDropdownOpen
     
    // Ensure sidebar is open in mobile mode
     if (this.isMobileView) {
      this.sidebarOpen = true;
    }
  }

  clearNotifications() {
    this.notificationSvc.clearNotifications();
  }

}
