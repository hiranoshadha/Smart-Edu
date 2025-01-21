package com.smartedu.controller;

import com.smartedu.model.Class;
import com.smartedu.repository.ClassRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("classes")
@CrossOrigin(origins = "http://localhost:3000", allowCredentials = "true")
public class ClassController {
    
    @Autowired
    private ClassRepository classRepository;
    
    @GetMapping
    public ResponseEntity<List<Class>> getAllClasses() {
        List<Class> classes = classRepository.findAll();
        return ResponseEntity.ok()
            .header("Access-Control-Allow-Origin", "http://localhost:3000")
            .header("Access-Control-Allow-Credentials", "true")
            .body(classes);
    }
    
    @GetMapping("/{id}")
    public ResponseEntity<Class> getClassById(@PathVariable Long id) {
        return classRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.notFound().build());
    }
    
    @GetMapping("/teacher/{teacher}")
    public List<Class> getClassesByTeacher(@PathVariable String teacher) {
        return classRepository.findByTeacher(teacher);
    }
    
    @GetMapping("/exam/{exam}")
    public List<Class> getClassesByExam(@PathVariable String exam) {
        return classRepository.findByExam(exam);
    }
    
    @PostMapping
    public Class createClass(@RequestBody Class classObj) {
        return classRepository.save(classObj);
    }
    
    @PutMapping("/{id}")
    public ResponseEntity<Class> updateClass(@PathVariable Long id, @RequestBody Class classDetails) {
        return classRepository.findById(id)
                .map(existingClass -> {
                    existingClass.setTitle(classDetails.getTitle());
                    existingClass.setDescription(classDetails.getDescription());
                    existingClass.setExam(classDetails.getExam());
                    existingClass.setTeacher(classDetails.getTeacher());
                    existingClass.setRating(classDetails.getRating());
                    existingClass.setReviews(classDetails.getReviews());
                    existingClass.setPrice(classDetails.getPrice());
                    existingClass.setSchedule(classDetails.getSchedule());
                    existingClass.setSyllabus(classDetails.getSyllabus());
                    existingClass.setFeatures(classDetails.getFeatures());
                    return ResponseEntity.ok(classRepository.save(existingClass));
                })
                .orElse(ResponseEntity.notFound().build());
    }
    
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteClass(@PathVariable Long id) {
        return classRepository.findById(id)
                .map(class1 -> {
                    classRepository.delete(class1);
                    return ResponseEntity.ok().build();
                })
                .orElse(ResponseEntity.notFound().build());
    }
}
