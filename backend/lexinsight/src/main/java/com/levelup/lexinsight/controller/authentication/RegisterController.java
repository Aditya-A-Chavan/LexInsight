package com.levelup.lexinsight.controller.authentication;

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

    @PostMapping("/registerLawyer")
    public ResponseEntity<ApiResponse> registerLawyer(@RequestBody AuthenticationPayload payload) {

        if(lawyerRepository.existsByEmail(payload.getEmail())) {
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
        lawyer.setAvailability(payload.getAvailability());
        lawyer.setAwards(payload.getAwards());
        lawyer.setBarRegistrationNumber(payload.getBar_registration_number());
        lawyer.setBio(payload.getBio());
        lawyer.setCorporateClients(payload.getCorporate_clients());
        lawyer.setCourtPracticed(payload.getCourtpracticed());
        lawyer.setEducation(payload.getEducation());
        lawyer.setPincode(payload.getPincode());
        lawyer.setProfilePicture(payload.getProfile_picture());
        lawyer.setSocialMediaLinks(payload.getSocial_media_links());
        lawyer.setSpecialization(payload.getSpecialization());

        List<String> practiceAreasList = Arrays.asList(payload.getPractice_area());
        lawyer.setPracticeAreas(practiceAreasList);

        lawyerRepository.save(lawyer);


        ApiResponse apiResponse = new ApiResponse(200, "Lawyer registered");

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/registerUser")
    public ResponseEntity<ApiResponse> registerUser(@RequestBody AuthenticationPayload User) {
        String username = User.getUsername();
        String email = User.getEmail();
        String password = User.getPassword();
        Boolean newzletter = User.getNewzletter();

        if (newzletter) {
            String[] interests = User.getInterests();
        }
        else {
            String[] interests = null;
        }
        

        ApiResponse apiResponse = new ApiResponse(200, "lawyer registered");
        return ResponseEntity.ok(apiResponse);
    }
}
