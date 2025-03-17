package finalProject.dishcoveryServer.repository;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;
import finalProject.dishcoveryServer.utils.fcmTokenSql;
import finalProject.dishcoveryServer.models.FCMToken;
import finalProject.dishcoveryServer.models.GroceryItem.GroceryItem;
import finalProject.dishcoveryServer.models.exception.GroceryNotSavedException;


@Repository
public class FcmRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public Boolean saveFcmToken(FCMToken fcmToken) {

        try {
            int saved = jdbcTemplate.update(fcmTokenSql.INSERT_FCM, fcmToken.getUserId(), fcmToken.getFcmToken());

            if (saved > 0) {
                return true;
            }

            return false;

        } catch (Exception e) {
             
            throw new GroceryNotSavedException("Cannot save FCM token error");
        }
    }


     public Optional<List<FCMToken>> fetchSavedFcmToken(String userId){

        List<FCMToken> fcmToken = new ArrayList<>();

        try {
            
            fcmToken = jdbcTemplate.query(fcmTokenSql.GET_SAVED_FCMToken,
                BeanPropertyRowMapper.newInstance(FCMToken.class), userId);
        
        return Optional.of(fcmToken);

    } catch (Exception e) {
        
        throw new GroceryNotSavedException("Cannot fetch saved fcmToken");
        
    }

    }
}
