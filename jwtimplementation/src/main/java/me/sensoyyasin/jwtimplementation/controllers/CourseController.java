package me.sensoyyasin.jwtimplementation.controllers;

import me.sensoyyasin.jwtimplementation.entities.Course;
import me.sensoyyasin.jwtimplementation.entities.CourseType;
import me.sensoyyasin.jwtimplementation.entities.Student;
import me.sensoyyasin.jwtimplementation.exceptions.CourseNotFoundException;
import me.sensoyyasin.jwtimplementation.services.CourseService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/course")
@CrossOrigin
public class CourseController {

    private final CourseService courseService;

    public CourseController(CourseService courseService) {
        this.courseService = courseService;
    }

    // Tüm kursları listeler
    @GetMapping
    public ResponseEntity<List<Course>> getAllCourses() {
        List<Course> courses = courseService.getAllCourses();
        if (courses.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return ResponseEntity.ok(courses);
    }

    //Id'si belli olan kullanıcının tüm Kurslarını getir.
    @GetMapping("{studentId}")
    public ResponseEntity<List<Course>> getCourseById(@PathVariable int studentId) {
        List<Course> courses = courseService.getCourseById(studentId);
        if (courses.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return ResponseEntity.ok(courses);
    }

    //Dersleri eslesmeyen kursları getir
    @GetMapping("/unselected/{studentId}")
    public ResponseEntity<List<CourseType>> getunselectedCourseById(@PathVariable int studentId) {
        List<CourseType> courseTypes = courseService.getUnSelectedCourses(studentId);
        if (courseTypes.isEmpty())
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        return ResponseEntity.ok(courseTypes);
    }

    //Id'si belli kullanıcı ekleme.
    @PostMapping("/add/{studentId}")
    public ResponseEntity<Student> addCoursesToStudent(@RequestBody Course course, @PathVariable int studentId) {
        Student updatedStudent = courseService.addCoursesToStudent(studentId, course);
        return getResponseEntity(updatedStudent);
    }

    //Id'si belli olan kullanıcı güncelleme
    @PutMapping("/update/{studentId}")
    public ResponseEntity<Student> updateCoursesForStudent(@PathVariable int studentId, @RequestBody Course course){
        Student student = courseService.updateCourseForStudent(studentId, course);
        return getResponseEntity(student);
    }

    // Id'si belli olan kullanıcının belirli bir dersini sil
    @DeleteMapping("/delete/{studentId}/{courseType}")
    public ResponseEntity<Student> deleteCourseForStudent(@PathVariable int studentId, @PathVariable String courseType) {
        Student updatedStudent = courseService.deleteCourseForStudent(studentId, courseType);
        return getResponseEntity(updatedStudent);
    }

    private ResponseEntity<Student> getResponseEntity(Student student) {
        if (student == null) {
            return ResponseEntity.notFound().build(); //Http 200
        } else {
            return ResponseEntity.ok(student); //Http 404
        }
    }

    @ExceptionHandler(CourseNotFoundException.class)
    public ResponseEntity<String> handleCourseNotFoundException(CourseNotFoundException e) {
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    @ExceptionHandler
    public ResponseEntity<String> handleAlreadyExistsException(Exception e) {
        return ResponseEntity.status(HttpStatus.CONFLICT).body(e.getMessage());
    }

}