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

    @PutMapping("/edit/{lawyer_id}")
    public ResponseEntity<ApiResponse> updateLawyerProfile(
            @PathVariable("lawyer_id") Long lawyerId,
            @RequestBody Lawyer updatedLawyer) {
        
        Lawyer existingLawyer = lawyerRepository.findById(lawyerId).orElse(null);
        
        if (existingLawyer == null) {
            return ResponseEntity.status(404)
                .body(new ApiResponse(404, "Lawyer not found"));
        }

        // Update only the provided fields
        if (updatedLawyer.getName() != null) existingLawyer.setName(updatedLawyer.getName());
        if (updatedLawyer.getPhone() != null) existingLawyer.setPhone(updatedLawyer.getPhone());
        if (updatedLawyer.getAddress() != null) existingLawyer.setAddress(updatedLawyer.getAddress());
        if (updatedLawyer.getPincode() != null) existingLawyer.setPincode(updatedLawyer.getPincode());
        if (updatedLawyer.getSpecialization() != null) existingLawyer.setSpecialization(updatedLawyer.getSpecialization());
        if (updatedLawyer.getExperience() != null) existingLawyer.setExperience(updatedLawyer.getExperience());
        if (updatedLawyer.getRating() != 0) existingLawyer.setRating(updatedLawyer.getRating());
        if (updatedLawyer.getPracticeAreas() != null) existingLawyer.setPracticeAreas(updatedLawyer.getPracticeAreas());
        if (updatedLawyer.getCourtPracticed() != null) existingLawyer.setCourtPracticed(updatedLawyer.getCourtPracticed());
        if (updatedLawyer.getBarRegistrationNumber() != null) existingLawyer.setBarRegistrationNumber(updatedLawyer.getBarRegistrationNumber());
        if (updatedLawyer.getProfilePicture() != null) existingLawyer.setProfilePicture(updatedLawyer.getProfilePicture());
        if (updatedLawyer.getLicenseNumber() != null) existingLawyer.setLicenseNumber(updatedLawyer.getLicenseNumber());
        if (updatedLawyer.getBio() != null) existingLawyer.setBio(updatedLawyer.getBio());
        if (updatedLawyer.getWebsite() != null) existingLawyer.setWebsite(updatedLawyer.getWebsite());
        if (updatedLawyer.getSocialMediaLinks() != null) existingLawyer.setSocialMediaLinks(updatedLawyer.getSocialMediaLinks());
        if (updatedLawyer.getAvailability() != null) existingLawyer.setAvailability(updatedLawyer.getAvailability());
        if (updatedLawyer.getLanguages() != null) existingLawyer.setLanguages(updatedLawyer.getLanguages());
        if (updatedLawyer.getAbout_me() != null) existingLawyer.setAbout_me(updatedLawyer.getAbout_me());
        if (updatedLawyer.getExperienceInYears() != 0) existingLawyer.setExperienceInYears(updatedLawyer.getExperienceInYears());
        if (updatedLawyer.getEducation() != null) existingLawyer.setEducation(updatedLawyer.getEducation());
        if (updatedLawyer.getAwards() != null) existingLawyer.setAwards(updatedLawyer.getAwards());
        if (updatedLawyer.getCorporateClients() != null) existingLawyer.setCorporateClients(updatedLawyer.getCorporateClients());

        // Save the updated lawyer
        lawyerRepository.save(existingLawyer);

        LawyerResponse lawyerResponse = convertToLawyerResponse(existingLawyer);
        ApiResponse response = new ApiResponse(200, "Lawyer profile updated successfully");
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