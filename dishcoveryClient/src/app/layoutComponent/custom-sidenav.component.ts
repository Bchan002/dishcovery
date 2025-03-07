import { Component, computed, Input, signal } from '@angular/core';

export type MenuItem = {
  icon:string
  label:string
  route:string
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
      route: "dashboard"
    },
    {
      icon: "dining",  
      label: "Recipe",
      route: "recipe"
    },
    {
      icon: "shopping_cart",     
      label: "Grocery",
      route: "grocery"
    }
  ]);

  profilePicSize = computed(()=>this.sideNavCollapsed()? '32': '100')


  
}
