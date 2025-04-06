package com.levelup.lexinsight.repository;

import com.levelup.lexinsight.model.Lawyer;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface LawyerRepository extends JpaRepository<Lawyer, Long> {
    public boolean existsByEmail(String email);


    Optional<Lawyer> findByEmail(String email);

}

