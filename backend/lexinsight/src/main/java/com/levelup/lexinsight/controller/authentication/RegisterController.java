package com.levelup.lexinsight.controller.authentication;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.levelup.lexinsight.model.User;
import com.levelup.lexinsight.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import com.levelup.lexinsight.dto.ApiResponse;
import com.levelup.lexinsight.repository.LawyerRepository;
import com.levelup.lexinsight.model.Lawyer;

import java.util.Arrays;
import java.util.List;

@RestController
@RequestMapping("/api/auth")
public class RegisterController {

    @Autowired
    private LawyerRepository lawyerRepository;


    @Autowired
    private UserRepository userRepository;


    @PostMapping("/registerLawyer")
    public ResponseEntity<ApiResponse> registerLawyer(@RequestBody AuthenticationPayload payload) {

        if (lawyerRepository.existsByEmail(payload.getEmail())) {
            return ResponseEntity.status(409).body(new ApiResponse(409, "Email already in use"));
        }

        Lawyer lawyer = new Lawyer();

        lawyer.setName(payload.getName());
        lawyer.setEmail(payload.getEmail());
        lawyer.setPassword(payload.getPassword());
        lawyer.setPhone(payload.getPhone());
        lawyer.setAddress(payload.getAddress());
        lawyer.setExperienceInYears(payload.getExperience_in_years());
        lawyer.setRating(payload.getRating());
        lawyer.setExperience(payload.getExperience());
        lawyer.setAbout_me(payload.getAbout_me());
        lawyer.setAvailability(payload.getAvailability());
        lawyer.setAwards(payload.getAwards());
        lawyer.setBarRegistrationNumber(payload.getBar_registration_number());
        lawyer.setBio(payload.getBio());
        lawyer.setCorporateClients(payload.getCorporate_clients());
        lawyer.setCourtPracticed(payload.getCourtpracticed());
//        lawyer.setEducation(payload.getEducation());
        lawyer.setPincode(payload.getPincode());
        ObjectMapper mapper = new ObjectMapper();
        String jsonEducation = null;
        try {
            jsonEducation = mapper.writeValueAsString(payload.getEducation());
            // continue with logic
        } catch (JsonProcessingException e) {
            e.printStackTrace();
            // optionally handle error or rethrow as a runtime exception
        }
        lawyer.setEducation(jsonEducation);

        lawyer.setProfilePicture(payload.getProfile_picture());
        lawyer.setSocialMediaLinks(payload.getSocial_media_links());
        lawyer.setSpecialization(payload.getSpecialization());

        List<String> practiceAreasList = Arrays.asList(payload.getPractice_area());
        lawyer.setPracticeAreas(practiceAreasList);

        lawyerRepository.save(lawyer);


        ApiResponse apiResponse = new ApiResponse(200, "Lawyer registered");

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/registeruser")
    public ResponseEntity<ApiResponse> registerUser(@RequestBody AuthenticationPayload payload) {

        User user = new User();
        if(userRepository.existsByEmail(payload.getEmail()) || userRepository.existsByUsername(payload.getUsername())) {
            ResponseEntity.status(409).body(new ApiResponse(409, "Email already in use"));
        }

        user.setUsername(payload.getUsername());
        user.setEmail(payload.getEmail());
        user.setPassword(payload.getPassword());
        user.setNewzletter(payload.getNewzletter());

        if (payload.getNewzletter() == true){
            List<String> interestsList = Arrays.asList(payload.getInterests());
            user.setInterests(interestsList);
        }

        userRepository.save(user);

        ApiResponse apiResponse = new ApiResponse(200, "user registered");
        return ResponseEntity.ok(apiResponse);
    }
}
