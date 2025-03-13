import { Component, inject } from '@angular/core';
import { getToken, Messaging, onMessage } from '@angular/fire/messaging';
import { NotificationService } from './service/NotificationService';
 

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dishcovery';
  private messaging = inject(Messaging);
  message:any

  private notificationSvc= inject(NotificationService)

  ngOnInit() {
    this.notificationSvc.requestPermission();
    this.notificationSvc.listenForMessages();
  }

  
}
