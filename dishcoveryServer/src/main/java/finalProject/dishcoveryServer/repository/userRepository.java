package finalProject.dishcoveryServer.repository;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.stereotype.Repository;

import finalProject.dishcoveryServer.models.User;
import finalProject.dishcoveryServer.models.exception.EmailNotFoundException;
import finalProject.dishcoveryServer.utils.userSql;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.rowset.SqlRowSet;

@Repository
public class userRepository {

    @Autowired
    private JdbcTemplate template;

    public Boolean save(User user) {

        int inserted = template.update(userSql.INSERT_SIGN_UP_DETAILS,
                user.getEmail(), user.getUsername(), user.getPassword());

        if (inserted > 0) {
            return true;
        }

        return false;

    }

    // Find the username
    public Optional<User> findByUserName(String username) {
        try {
            User user = template.queryForObject(userSql.GET_USERNAME,
                    BeanPropertyRowMapper.newInstance(User.class), username);
            return Optional.ofNullable(user);
            
        } catch (EmptyResultDataAccessException ex) {
            return Optional.empty();
        }
    }


    //Find email 
    public boolean findEmailExists(String email){

        try {
            SqlRowSet sqlRowSet= template.queryForRowSet(userSql.CHECK_EMAIL_EXISTS,email);

            while(sqlRowSet.next()){
                return true;
            }

            return false;
            
        } catch (Exception e) {
            throw new EmailNotFoundException("Email not found");
           
        }  
       
    }

    // Update password 
    public boolean updatePassword(String email, String newPassword){

        int updated = template.update(userSql.UPDATE_PASSWORD, newPassword,email);

        if(updated>0){
            return true;
        }

        return false;
    }

}
