package com.levelup.lexinsight.repository;

import com.levelup.lexinsight.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepository extends JpaRepository<Blog, Long> {
    @Query("SELECT b FROM Blog b LEFT JOIN FETCH b.lawyer l ORDER BY b.createdAt DESC")
    List<Blog> findAllWithLawyer();
}

