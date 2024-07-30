package me.sensoyyasin.jwtimplementation.repositories;

import me.sensoyyasin.jwtimplementation.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Integer> {
    Optional<Course> findByCourseName(String courseName);
    Optional<Course> findById(int courseId);
}