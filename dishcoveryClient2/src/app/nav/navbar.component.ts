import { Component, EventEmitter, Output } from '@angular/core';
import { map, Observable } from 'rxjs';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: false,
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  @Output() toggleSidebar = new EventEmitter<void>();
  
  // Ideally, these properties would be shared through a service
  isDarkTheme = false;
  
  constructor(private router: Router) {}
  
  ngOnInit() {
    // Check localStorage for theme preference
    this.isDarkTheme = localStorage.getItem('theme') === 'dark';
  }
  
  onToggleSidebar() {
    this.toggleSidebar.emit();
  }
  
  toggleTheme() {
    this.isDarkTheme = !this.isDarkTheme;
    localStorage.setItem('theme', this.isDarkTheme ? 'dark' : 'light');
    
    // Apply theme - in a real app, use a service to synchronize with other components
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }
  
  logout() {
    // Clear any authentication tokens
    localStorage.removeItem('jwtToken');
    localStorage.removeItem('username');
    
    // Navigate to login page
    this.router.navigate(['/']);
  }
}
