package com.levelup.lexinsight.controller.authentication;

import java.util.List;

// src/main/java/com/levelup/lexinsight/controller/authentication/RegisterRequest.java
public class AuthenticationPayload {
    private String email;
    private String password;
    private String username;

    private Integer experience_in_years;
    private Double rating;
    private String address;
    private String availability;
    private String awards;
    private String bar_registration_number;
    private String bio;
    private String corporate_clients;
    private String courtpracticed;
    private String education;
    private String name;
    private String phone;
    private String pincode;
    private String profile_picture;
    private String social_media_links;
    private String specialization;
    private String experience;
    private String[] practice_area;
    private String about_me;

    private Boolean newzletter;
    private String[] interests;

    public List<String> getInterests() { return List.of(interests); }
    public void setInterests(String[] interests) { this.interests = interests; }

    public Boolean getNewzletter() { return newzletter; }
    public void setNewzletter(Boolean newzletter) { this.newzletter = newzletter; }


    public String getUsername() { return username; }
    public void setUsername(String username) { this.username = username; }

    public String getEmail() { return email; }
    public void setEmail(String email) { this.email = email; }

    public String getPassword() { return password; }
    public void setPassword(String password) { this.password = password; }


    public Integer getExperience_in_years() { return experience_in_years; }
    public void setExperience_in_years(Integer experience_in_years) { this.experience_in_years = experience_in_years; }

    public Double getRating() { return rating; }
    public void setRating(Double rating) { this.rating = rating; }

    public String getAddress() { return address; }
    public void setAddress(String address) { this.address = address; }

    public String getAvailability() { return availability; }
    public void setAvailability(String availability) { this.availability = availability; }

    public String getAwards() { return awards; }
    public void setAwards(String awards) { this.awards = awards; }

    public String getBar_registration_number() { return bar_registration_number; }
    public void setBar_registration_number(String bar_registration_number) { this.bar_registration_number = bar_registration_number; }

    public String getBio() { return bio; }
    public void setBio(String bio) { this.bio = bio; }

    public String getCorporate_clients() { return corporate_clients; }
    public void setCorporate_clients(String corporate_clients) { this.corporate_clients = corporate_clients; }

    public String getCourtpracticed() { return courtpracticed; }
    public void setCourtpracticed(String courtpracticed) { this.courtpracticed = courtpracticed; }

    public String getEducation() { return education; }
    public void setEducation(String education) { this.education = education; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public String getPhone() { return phone; }
    public void setPhone(String phone) { this.phone = phone; }

    public String getPincode() { return pincode; }
    public void setPincode(String pincode) { this.pincode = pincode; }

    public String getProfile_picture() { return profile_picture; }
    public void setProfile_picture(String profile_picture) { this.profile_picture = profile_picture; }

    public String getSocial_media_links() { return social_media_links; }
    public void setSocial_media_links(String social_media_links) { this.social_media_links = social_media_links; }

    public String getSpecialization() { return specialization; }
    public void setSpecialization(String specialization) { this.specialization = specialization; }

    public String getExperience() { return experience; }
    public void setExperience(String     experience) { this.experience = experience; }

    public String[] getPractice_area() { return practice_area; }
    public void setPractice_area(String[] practice_area) { this.practice_area = practice_area; }

    public String getAbout_me() { return about_me; }
    public void setAbout_me(String about_me) { this.about_me = about_me; }
}
