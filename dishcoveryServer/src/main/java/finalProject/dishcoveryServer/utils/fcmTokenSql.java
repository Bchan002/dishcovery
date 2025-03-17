package finalProject.dishcoveryServer.utils;

public class fcmTokenSql {
    
    public static final String INSERT_FCM= """
        INSERT into userFCMTokens (userId,fcmToken) values (?,?)
        """;

    public static final String GET_SAVED_FCMToken = """
            SELECT * FROM userFCMTokens WHERE  userId = ?;
            """;
}
