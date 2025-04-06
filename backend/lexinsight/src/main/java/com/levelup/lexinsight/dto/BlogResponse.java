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
    private long lawyer_id;
    private String externalLink;
    private String type;
    private LocalDateTime createdAt;
}
