package com.levelup.lexinsight.controller.authentication;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.RequestBody;
import com.levelup.lexinsight.dto.ApiResponse;

@RestController
@RequestMapping("/api/auth")
public class RegisterController {

    @PostMapping("/registerLawyer")
    public ResponseEntity<ApiResponse> registerLawyer(@RequestBody AuthenticationPayload Lawyer) {
        String name = Lawyer.getName();
        String email = Lawyer.getEmail();
        String password = Lawyer.getPassword();
        String phone = Lawyer.getPhone();
        String address = Lawyer.getAddress();
        Integer experience_in_years = Lawyer.getExperience_in_years();
        Double rating = Lawyer.getRating();
        String availability = Lawyer.getAvailability();
        String awards = Lawyer.getAwards();
        String bar_registration_number = Lawyer.getBar_registration_number();
        String bio = Lawyer.getBio();
        String corporate_clients = Lawyer.getCorporate_clients();
        String courtpracticed = Lawyer.getCourtpracticed();
        String education = Lawyer.getEducation();
        String pincode = Lawyer.getPincode();
        String profile_picture = Lawyer.getProfile_picture();
        String social_media_links = Lawyer.getSocial_media_links();
        String specialization = Lawyer.getSpecialization();
        String[] experience = Lawyer.getExperience();
        String[] practice_area = Lawyer.getPractice_area();
        String about_me = Lawyer.getAbout_me();




        //TODO: Add db logic


        ApiResponse apiResponse = new ApiResponse(200, "Lawyer registered");

        return ResponseEntity.ok(apiResponse);
    }

    @PostMapping("/registerUser")
    public ResponseEntity<ApiResponse> registerUser(@RequestBody AuthenticationPayload User) {
        String username = User.getUsername();
        String email = User.getEmail();
        String password = User.getPassword();

        

        ApiResponse apiResponse = new ApiResponse(200, "lawyer registered");
        return ResponseEntity.ok(apiResponse);
    }
}
