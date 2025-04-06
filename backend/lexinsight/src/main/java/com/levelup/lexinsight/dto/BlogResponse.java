package com.levelup.lexinsight.dto;


import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
public class BlogResponse {
    private Long id;
    private String title;
    private String content;
    private Long lawyer_id;
    private String name;
    private String bio;
    private String externalLink;
    private String type;
    private String specialization;
    private LocalDateTime createdAt;
}

