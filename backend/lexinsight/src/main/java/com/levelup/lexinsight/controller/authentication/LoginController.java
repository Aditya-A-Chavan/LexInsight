package com.levelup.lexinsight.controller.authentication;


import com.levelup.lexinsight.dto.ApiResponse;
import com.levelup.lexinsight.model.Lawyer;
import com.levelup.lexinsight.model.User;
import com.levelup.lexinsight.repository.LawyerRepository;
import com.levelup.lexinsight.repository.UserRepository;
import lombok.extern.slf4j.Slf4j;
import org.hibernate.jdbc.Expectation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.resource.ResourceUrlProvider;

@Slf4j
@RestController
@RequestMapping("/api/auth")
public class LoginController {

    @Autowired
    private LawyerRepository lawyerRepository;

    @Autowired
    private UserRepository userRepository;



    @PostMapping("/authenticate")
    public ResponseEntity<ApiResponse> authenticate(@RequestBody AuthenticationPayload payload) {
        String email = payload.getEmail();
//        log.info("email: " + email);
        String password = payload.getPassword();

        if (lawyerRepository.existsByEmail(email)) {
            Lawyer lawyer = lawyerRepository.findByEmail(email).orElse(null);
            if (lawyer != null) {
                String lawyer_password = lawyer.getPassword();
                if (lawyer_password.equals(password)) {
                    ApiResponse apiResponse = new ApiResponse(200, "Success");
                    apiResponse.addData("role", "Lawyer");
                    apiResponse.addData("lawyer_id", lawyer.getId());
                    return ResponseEntity.status(200).body(apiResponse);
                } else {
                    return ResponseEntity.status(400).body(new ApiResponse(400, "Invalid password"));
                }
            }
        } else if (userRepository.existsByEmail(email)) {
            User user = userRepository.findByEmail(email).orElse(null);
            if (user != null) {
                String user_password = user.getPassword();
                if (user_password.equals(password)) {
                    ApiResponse apiResponse = new ApiResponse(200, "Success");
                    apiResponse.addData("role", "User");
                    apiResponse.addData("user_id", user.getId());
                    return ResponseEntity.status(200).body(apiResponse);
                } else {
                    return ResponseEntity.status(400).body(new ApiResponse(400, "Invalid password"));
                }
            }
        }

        return ResponseEntity.status(401).body(new ApiResponse(401, "Invalid email or password, User does not exist"));
    }
}
