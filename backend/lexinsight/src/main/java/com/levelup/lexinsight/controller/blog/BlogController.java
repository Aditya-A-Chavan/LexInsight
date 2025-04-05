package com.levelup.lexinsight.controller.blog;


import com.levelup.lexinsight.dto.ApiResponse;
import com.levelup.lexinsight.dto.BlogResponse;
import com.levelup.lexinsight.model.Blog;
import com.levelup.lexinsight.model.Lawyer;
import com.levelup.lexinsight.repository.BlogRepository;
import com.levelup.lexinsight.repository.LawyerRepository;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Slf4j
@RestController
@RequestMapping("/api/blogs")
public class BlogController {

    @Autowired
    private BlogRepository blogRepository;

    @Autowired
    private LawyerRepository lawyerRepository;

    @PostMapping("/create-blog")
    public ResponseEntity<ApiResponse> createBlog(@RequestBody BlogResponse request){
        Lawyer lawyer = lawyerRepository.findById(request.getLawyer_id()).orElse(null);

        if(lawyer == null){
            return ResponseEntity.status(404).body(new ApiResponse(404, "Lawyer not found"));
        }

        Blog blog = new Blog();

        blog.setTitle(request.getTitle());
        blog.setContent(request.getContent());
        blog.setLawyer(lawyer);
        blog.setExternalLink(request.getExternalLink());
        blog.setType(request.getType());

        log.info("Creating blog {}", blog);
        blogRepository.save(blog);

        return ResponseEntity.status(201).body(new ApiResponse(201, "Created"));

    }


    @GetMapping("/all-blogs")
    public ResponseEntity<List<BlogResponse>> getAllBlogs(){
        List<Blog> blogs = blogRepository.findAll();

        List<BlogResponse> response = blogs.stream().map(blog -> {
            BlogResponse dto = new BlogResponse();
            dto.setId(blog.getId());
            dto.setTitle(blog.getTitle());
            dto.setContent(blog.getContent());
            dto.setLawyer_id(blog.getLawyer().getId());
            dto.setExternalLink(blog.getExternalLink());
            dto.setType(blog.getType());
            dto.setCreatedAt(blog.getCreatedAt());
            return dto;
        }).collect(Collectors.toList());

        return ResponseEntity.ok(response);
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getBlogById(@PathVariable Long id) {
        Optional<Blog> optionalBlog = blogRepository.findById(id);

        if (optionalBlog.isPresent()) {
            Blog blog = optionalBlog.get();

            BlogResponse dto = new BlogResponse();
            dto.setId(blog.getId());
            dto.setTitle(blog.getTitle());
            dto.setContent(blog.getContent());
            dto.setLawyer_id(blog.getLawyer().getId());
            dto.setExternalLink(blog.getExternalLink());
            dto.setType(blog.getType());
            dto.setCreatedAt(blog.getCreatedAt());

            return ResponseEntity.ok(dto);
        } else {
            return ResponseEntity.status(404).body(new ApiResponse(404, "Blog not found"));
        }
    }


}

