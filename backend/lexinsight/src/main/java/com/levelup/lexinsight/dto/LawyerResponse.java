package com.levelup.lexinsight.dto;

import lombok.Data;
import java.time.LocalDateTime;
import java.util.List;

@Data
public class LawyerResponse {
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;
    private String pincode;
    private String specialization;
    private String experience;
    private double rating;
    private List<String> practiceAreas;
    private String courtPracticed;
    private String barRegistrationNumber;
    private String profilePicture;
    private String licenseNumber;
    private String bio;
    private String website;
    private String socialMediaLinks;
    private String availability;
    private String languages;
    private String about_me;
    private int experienceInYears;
    private String education;
    private String awards;
    private String corporateClients;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
