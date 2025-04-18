package com.levelup.lexinsight.model;

import java.time.LocalDateTime;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "Blog")
@Setter
@Getter
public class Blog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "blog_id")
    private Long blogId;

    @Column(name = "title")
    private String title;

    @Column(name = "content", columnDefinition = "TEXT")
    private String content;
    

    @ManyToOne
    @JoinColumn(name = "lawyer_id", referencedColumnName = "id")
    private Lawyer lawyer;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "external_link")
    private String externalLink;

    @Column(name = "type")
    private String type;
}
