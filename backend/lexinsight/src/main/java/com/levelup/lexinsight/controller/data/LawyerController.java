package com.levelup.lexinsight.controller.data;

import com.levelup.lexinsight.model.Lawyer;
import com.levelup.lexinsight.repository.LawyerRepository;
import com.levelup.lexinsight.dto.ApiResponse;
import com.levelup.lexinsight.dto.LawyerResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/lawyers")
public class LawyerController {

    @Autowired
    private LawyerRepository lawyerRepository;

    @GetMapping
    public ResponseEntity<ApiResponse> getAllLawyers() {
        List<Lawyer> lawyers = lawyerRepository.findAll();
        List<LawyerResponse> lawyerResponses = lawyers.stream()
            .map(this::convertToLawyerResponse)
            .collect(Collectors.toList());
        
        ApiResponse response = new ApiResponse(200, "Lawyers retrieved successfully");
        response.addData("lawyers", lawyerResponses);
        return ResponseEntity.ok(response);
    }

    @GetMapping("/{lawyer_id}")
    public ResponseEntity<ApiResponse> getLawyerById(@PathVariable("lawyer_id") Long lawyerId) {
        Lawyer lawyer = lawyerRepository.findById(lawyerId).orElse(null);
        
        if (lawyer == null) {
            return ResponseEntity.status(404)
                .body(new ApiResponse(404, "Lawyer not found"));
        }

        LawyerResponse lawyerResponse = convertToLawyerResponse(lawyer);
        ApiResponse response = new ApiResponse(200, "Lawyer retrieved successfully");
        response.addData("lawyer", lawyerResponse);
        return ResponseEntity.ok(response);
    }

    private LawyerResponse convertToLawyerResponse(Lawyer lawyer) {
        LawyerResponse response = new LawyerResponse();
        response.setId(lawyer.getId());
        response.setName(lawyer.getName());
        response.setEmail(lawyer.getEmail());
        response.setPhone(lawyer.getPhone());
        response.setAddress(lawyer.getAddress());
        response.setPincode(lawyer.getPincode());
        response.setSpecialization(lawyer.getSpecialization());
        response.setExperience(lawyer.getExperience());
        response.setRating(lawyer.getRating());
        response.setPracticeAreas(lawyer.getPracticeAreas());
        response.setCourtPracticed(lawyer.getCourtPracticed());
        response.setBarRegistrationNumber(lawyer.getBarRegistrationNumber());
        response.setProfilePicture(lawyer.getProfilePicture());
        response.setLicenseNumber(lawyer.getLicenseNumber());
        response.setBio(lawyer.getBio());
        response.setWebsite(lawyer.getWebsite());
        response.setSocialMediaLinks(lawyer.getSocialMediaLinks());
        response.setAvailability(lawyer.getAvailability());
        response.setLanguages(lawyer.getLanguages());
        response.setAbout_me(lawyer.getAbout_me());
        response.setExperienceInYears(lawyer.getExperienceInYears());
        response.setEducation(lawyer.getEducation());
        response.setAwards(lawyer.getAwards());
        response.setCorporateClients(lawyer.getCorporateClients());
        response.setCreatedAt(lawyer.getCreatedAt());
        response.setUpdatedAt(lawyer.getUpdatedAt());
        return response;
    }
}