package com.smartedu.repository;

import com.smartedu.model.Class;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ClassRepository extends JpaRepository<Class, Long> {
    List<Class> findByTeacher(String teacher);
    List<Class> findByExam(String exam);
}
