import { Component, inject } from '@angular/core';
import { NotificationService } from './service/NotificationService';
import { Messaging } from '@angular/fire/messaging';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false,
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'dishcoveryClient';

  private messaging = inject(Messaging);
  message:any

  private notificationSvc= inject(NotificationService)

  ngOnInit() {
    this.notificationSvc.requestPermission();
    this.notificationSvc.listenForMessages();
  }
  
}
