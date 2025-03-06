package finalProject.dishcoveryServer.service;

import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.dao.DataAccessException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import finalProject.dishcoveryServer.models.SignUpDetails;
import finalProject.dishcoveryServer.models.User;
import finalProject.dishcoveryServer.models.exception.SignUpUnsuccessfulExcpetion;
import finalProject.dishcoveryServer.repository.userRepository;

@Service
public class userService {
    
    @Autowired
    private userRepository userRepo;

    @Autowired
    private PasswordEncoder passwordEncoder;

    public void postSignUpDetails(SignUpDetails signUpDetails){

        try {

            //Encrypt the password details 
            User user = new User();
            user.setEmail(signUpDetails.getEmail());
            user.setUsername(signUpDetails.getUsername());

            String encodedPassword = passwordEncoder.encode(signUpDetails.getPassword());
            user.setPassword(encodedPassword);

            user.setRoles("ROLE_USER");
             // Insert the details into mySQL DataBase 

            this.userRepo.save(user);
            
        } catch (DataAccessException e) {
            
            throw new SignUpUnsuccessfulExcpetion("Duplicate Email Found, Please try a different email");
        }
        
    }

    
    public Optional<User> findByUsername(String username) {
        return userRepo.findByUserName(username);
    }


}
