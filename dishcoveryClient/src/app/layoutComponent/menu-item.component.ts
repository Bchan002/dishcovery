import { Component, Input, input, signal } from '@angular/core';
import { MenuItem } from './custom-sidenav.component';

@Component({
  selector: 'app-menu-item',
  standalone: false,
  templateUrl: './menu-item.component.html',
  styleUrl: './menu-item.component.css'
})
export class MenuItemComponent {

  @Input() 
  item!: MenuItem;

  @Input()
  collapsed!:boolean

  nestedMenuOpen = signal(false)
  

  toggleNested() {
    if(!this.item.subItems){
      return;
    }

    this.nestedMenuOpen.set(!this.nestedMenuOpen())
  }

}
