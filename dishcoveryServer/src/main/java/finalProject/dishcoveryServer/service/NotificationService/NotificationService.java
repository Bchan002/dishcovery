package finalProject.dishcoveryServer.service.NotificationService;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.firebase.FirebaseApp;
import com.google.firebase.messaging.FirebaseMessaging;
import com.google.firebase.messaging.FirebaseMessagingException;
import com.google.firebase.messaging.Message;
import com.google.firebase.messaging.Notification;

@Service
public class NotificationService {
    
    @Autowired
    private FirebaseApp firebaseApp;
    
    // // In-memory storage for tokens - in a real app, you'd save these to a database
    // private final Map<String, String> userTokens = new ConcurrentHashMap<>();

    // /**
    //  * Save a user's FCM token
    //  */
    // public void saveToken(String username, String token) {
    //     userTokens.put(username, token);
    //     System.out.println("Saved token for user " + username + ": " + token);
    // }

    // /**
    //  * Get a user's FCM token
    //  */
    // public String getToken(String username) {
    //     return userTokens.get(username);
    // }

    // /**
    //  * Send a notification to a user
    //  */
    // public void sendNotification(String username, String title, String body) {
    //     String token = userTokens.get(username);
        
    //     if (token == null) {
    //         System.out.println("No token found for user: " + username);
    //         return;
    //     }
        
    //     sendNotificationToToken(token, title, body);
    // }

    /**
     * Send a notification directly to a token
     */
    public void sendNotificationToToken(String token, String title, String body) {
        try {
            Notification notification = Notification.builder()
                    .setTitle(title)
                    .setBody(body)
                    .build();

            Message message = Message.builder()
                    .setToken(token)
                    .setNotification(notification)
                    .putData("click_action", "FLUTTER_NOTIFICATION_CLICK")
                    .build();

            System.out.println("Sending notification to token: " + token);
            System.out.println("Notification content: " + notification);
            
            String response = FirebaseMessaging.getInstance(firebaseApp).send(message);
            System.out.println("Notification sent successfully. Message ID: " + response);
            
        } catch (FirebaseMessagingException e) {
            System.err.println("Error sending notification: " + e.getMessage());
            e.printStackTrace();
        }
    }

    /**
     * For testing: directly send a notification to the token you already have
     */
    public void sendTestNotification(String token) {
        sendNotificationToToken(token, 
                             "Grocery Expiration Alert", 
                             "Some of your groceries are about to expire!");
    }
}
