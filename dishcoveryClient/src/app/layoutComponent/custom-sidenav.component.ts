import { Component, computed, Input, signal } from '@angular/core';

export interface MenuItem {
  icon:string
  label:string
  route:string
  subItems?: MenuItem[]
}


@Component({
  selector: 'app-custom-sidenav',
  standalone: false,
  templateUrl: './custom-sidenav.component.html',
  styleUrl: './custom-sidenav.component.css'
})
export class CustomSidenavComponent {
  
  sideNavCollapsed = signal(false);
  
  @Input()
  set collapsed(val:boolean){
    //console.info("value is ", val)
    this.sideNavCollapsed.set(val);
  }
  
  menuItems = signal<MenuItem[]>([
    {
      icon: "dashboard",
      label: "Dashboard",
      route: "dashboard",
      subItems: [
        {
          icon: "fastfood",  
          label: "View Saved Recipes",
          route: "savedRecipes", 
        }, 
      ]
    },
    {
      icon: "dining",  
      label: "Popular Recipe",
      route: "recipe", 
      subItems: [
        {
          icon: "fastfood",  
          label: "breakfast",
          route: "breakfast", 
        }, 
        {
          icon: "lunch_dining",  
          label: "lunch",
          route: "lunch", 
        }, 
        {
          icon: "dinner_dining",  
          label: "dinner",
          route: "dinner", 
        }
      ]
    },
    {
      icon: "shopping_cart",     
      label: "Grocery",
      route: "grocery"
    }
  ]);

  profilePicSize = computed(()=>this.sideNavCollapsed()? '32': '100')


  
}
