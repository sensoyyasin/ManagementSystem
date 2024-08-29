package me.sensoyyasin.jwtbackend.controllers;

import me.sensoyyasin.jwtbackend.entities.Student;
import me.sensoyyasin.jwtbackend.exceptions.StudentNotFoundException;
import me.sensoyyasin.jwtbackend.services.StudentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/student")
@CrossOrigin
public class StudentController {

    @Autowired
    private StudentService studentService;

    @GetMapping()
    public List<Student> getAllStudents(){
        return studentService.getAllStudents();
    }

    @GetMapping("{id}")
    public ResponseEntity<Student> getStudentById(@PathVariable int id){
        //@PathVariable int id: Bu parametre, URL üzerindeki path'te belirtilen id değerini alır. Örneğin, /students/3 URL'i için id değeri 3 olacaktır.
        Student student = studentService.getStudentById(id);
        return getMineResponseEntity(student);
    }

    @GetMapping(value = "/search/{text}")
    public List<Student> searchStudent(@PathVariable String text){
        return studentService.getSearch(text);
    }

    @PostMapping("/add")
    public ResponseEntity<Student> addStudent(@RequestBody Student student){
        //Spring Bootta JSON,XML -> Java nesnelerine dönüştürmek için @RequestBody.
        studentService.saveStudent(student);
        return getMineResponseEntity(student);
    }

    @PutMapping("{id}")
    public ResponseEntity<Student> updateStudent(@PathVariable int id, @RequestBody Student student){
        Student updatedStudent = studentService.updateStudent(id, student);
        return getMineResponseEntity(updatedStudent);
    }

    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteStudent(@PathVariable int id){
        Student deletedStudent = studentService.deleteStudent(id);
        if (deletedStudent != null)
            return ResponseEntity.ok("Student with id " + id + " was deleted successfully");
        else
            return ResponseEntity.notFound().build();
    }

    @ExceptionHandler(StudentNotFoundException.class)
    public ResponseEntity<String> handleStudentNotFoundException(StudentNotFoundException e){
        return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
    }

    private ResponseEntity<Student> getMineResponseEntity(Student student){
        if (student != null) {
            return ResponseEntity.ok(student); //Http 200
        } else {
            return ResponseEntity.notFound().build(); //Http 404
        }
    }
}