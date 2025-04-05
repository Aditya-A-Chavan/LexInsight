package com.levelup.lexinsight.model;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "lawyer")
@Setter
@Getter
public class lawyer {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "email")
    private String email;

    @Column(name = "password")
    private String password;

    @Column(name = "phone")
    private String phone;

    @Column(name = "address")
    private String address;

    @Column(name = "pincode")
    private String pincode;

    @Column(name = "specialization")
    private String specialization;

    @Column(name = "experience")
    private int experience;

    @Column(name = "rating")
    private double rating;

    @Column(name = "practice_area")
    private List<String> practiceAreas;

    @Column(name = "courtpracticed")
    private String courtPracticed;

    @Column(name = "bar_registration_number")
    private String barRegistrationNumber;

    @Column(name = "profile_picture")
    private String profilePicture;

    @Column(name = "license_number")
    private String licenseNumber;

    @Column(name = "bio")
    private String bio;

    @Column(name = "website")
    private String website;

    @Column(name = "social_media_links")
    private String socialMediaLinks;

    @Column(name = "availability")
    private String availability;

    @Column(name = "languages")
    private String languages;

    @Column(name = "Experience_in_years")
    private int experienceInYears;

    @Column(columnDefinition = "json")
    private String education;

    @Column(name = "awards")
    private String awards;

    @Column(name = "corporate_clients")
    private String corporateClients;

    @OneToMany(mappedBy = "lawyer", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<blog> blogs = new ArrayList<>();

    @OneToMany(mappedBy = "lawyer")
    private List<answere> answere = new ArrayList<>();

    @OneToMany(mappedBy = "lawyer")
    private List<quetion> quetion = new ArrayList<>();

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    // Getters and Setters (if not using Lombok)
}
