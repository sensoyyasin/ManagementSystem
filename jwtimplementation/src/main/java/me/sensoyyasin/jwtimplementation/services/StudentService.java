package me.sensoyyasin.jwtimplementation.services;

import me.sensoyyasin.jwtimplementation.entities.Student;

import java.util.List;

public interface StudentService {
    public Student saveStudent(Student student);
    public List<Student> getAllStudents();
    public Student getStudentById(int id);
    public Student updateStudent(int id, Student student);
    public Student deleteStudent(int id);
    public List<Student> getSearch(String search);
}