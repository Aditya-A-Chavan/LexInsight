package com.levelup.lexinsight.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "Quetion")
@Setter
@Getter
public class Quetion {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "question_id")
    private Long questionId;

    @Column(name = "question")
    private String question;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private User user;

    @ManyToOne
    @JoinColumn(name = "lawyer_id", referencedColumnName = "id")
    private Lawyer lawyer;

    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "external_link")
    private String externalLink;
}
