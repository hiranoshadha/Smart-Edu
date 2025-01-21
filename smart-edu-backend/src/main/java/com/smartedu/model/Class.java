package com.smartedu.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "classes")
public class Class {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String title;
    private String description;
    private String exam;
    private String teacher;
    private Double rating;
    private Integer reviews;
    private String price;
    
    @Column(columnDefinition = "TEXT")
    private String schedule;
    
    @Column(columnDefinition = "TEXT")
    private String syllabus;
    
    @Column(columnDefinition = "TEXT")
    private String features;
}
