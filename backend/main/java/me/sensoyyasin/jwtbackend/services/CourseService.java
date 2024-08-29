package me.sensoyyasin.jwtbackend.services;

import me.sensoyyasin.jwtbackend.entities.Course;
import me.sensoyyasin.jwtbackend.entities.CourseType;
import me.sensoyyasin.jwtbackend.entities.Student;

import java.util.List;

public interface CourseService {
    List<Course> getAllCourses();
    List<Course> getCourseById(int studentId);
    Student addCoursesToStudent(int studentId, Course course);
    Student updateCourseForStudent(int studentId, Course newCourseName);
    Student deleteCourseForStudent(int studentId, String courseType);
    List<CourseType> getUnSelectedCourses(int studentId);
}