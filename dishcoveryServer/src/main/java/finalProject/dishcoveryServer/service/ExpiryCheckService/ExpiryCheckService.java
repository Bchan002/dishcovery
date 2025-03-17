package finalProject.dishcoveryServer.service.ExpiryCheckService;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;

import finalProject.dishcoveryServer.repository.FcmRepository;
import finalProject.dishcoveryServer.repository.GroceryRepository;
import finalProject.dishcoveryServer.service.NotificationService.NotificationService;
import finalProject.dishcoveryServer.models.FCMToken;
import finalProject.dishcoveryServer.models.GroceryItem.GroceryItemChecker;

@Service
public class ExpiryCheckService {
    
    @Autowired
    private GroceryRepository groceryRepo;

    @Autowired
    private NotificationService notificationSvc;

    @Autowired
    private FcmRepository fcmRepo;

    //Set at midnight everyday
    //@Scheduled(fixedRate = 10000)
    // at 12:00 AM every day
    @Scheduled(cron="0 0 0 * * ?")
    public void checkExpiredItems() {

        System.out.println("🔄 Scheduled task running at: " + LocalDateTime.now());
        //Get the expired item List 
        Optional<List<GroceryItemChecker>>groceryChecker = groceryRepo.findExpiredItems();
       
        if(groceryChecker.isPresent() && !groceryChecker.get().isEmpty()){

            List<GroceryItemChecker> groceryCheckerItem = groceryChecker.get();

            // Get the userId 
            String userId = groceryCheckerItem.get(0).getUserId();
            System.out.println("Your userId is " + userId);

            // Get the FCM Token 
            Optional<List<FCMToken>> fcmTokens = fcmRepo.fetchSavedFcmToken(userId);

            if(fcmTokens.isPresent() && !fcmTokens.get().isEmpty()){
                 
                for(FCMToken token : fcmTokens.get()) {

                    for(GroceryItemChecker groceryItem: groceryCheckerItem){
                        // get the token 
                        String fcmToken = token.getFcmToken();
                        String cleanToken = fcmToken.replace("\"", "").trim();
                        System.out.println("Your  fcmToken is " + cleanToken);
                          // Send to notification Service 
                        String title = "Item expiry alert!";
                        String body = groceryItem.getItemName() + " has expired! Please check your inventory";
                        notificationSvc.sendNotificationToToken(cleanToken, title, body);

                        //Update the last notified 
                        groceryRepo.updateLastNotification(groceryItem.getItemId());
                    }
                } 
             } else {
                System.out.println("You have an error");
            }

        }
    }
}
