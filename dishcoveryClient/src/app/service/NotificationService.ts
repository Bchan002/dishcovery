import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/compat/messaging';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
    constructor(private afMessaging: AngularFireMessaging) {}
    
    requestPermission() {
      this.afMessaging.requestToken.pipe(take(1)).subscribe(
        (token) => {
          console.log('User FCM Token:', token);
          localStorage.setItem('fcmToken', JSON.stringify(token));
          // Send token to backend
        },
        (error) => {
          console.error('Permission denied', error);
        }
      );
    }
    
    listenForMessages() {
      this.afMessaging.messages.subscribe((message) => {
        console.log('New notification:', message);
        
        // Manually create a visible notification when app is in foreground
        if (Notification.permission === 'granted') {
          const notificationTitle = message?.notification?.title || 'Grocery Expiration Alert';
          const notificationOptions = {
            body: message?.notification?.body || 'Check your groceries!',
            icon: '/assets/icons/icon-72x72.png'
          };
          
          // Create the notification
          const notification = new Notification(notificationTitle, notificationOptions);
          
          // Optional: Add click handler
          notification.onclick = () => {
            console.log('Notification clicked');
            window.focus();
            notification.close();
          };
        }
      });
    }
  }