package com.levelup.lexinsight.model;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "answere")
@Setter
@Getter
public class answere {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "answer")
    private String answer;

    @ManyToOne
    @JoinColumn(name = "question_id", referencedColumnName = "id")
    private quetion question;

    @ManyToOne
    @JoinColumn(name = "user_id", referencedColumnName = "id")
    private user user;

    @ManyToOne
    @JoinColumn(name = "lawyer_id", referencedColumnName = "id")
    private Lawyer lawyer;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
