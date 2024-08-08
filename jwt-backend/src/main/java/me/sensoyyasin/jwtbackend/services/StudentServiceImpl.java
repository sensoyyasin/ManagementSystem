package me.sensoyyasin.jwtbackend.services;

import me.sensoyyasin.jwtbackend.entities.Student;
import me.sensoyyasin.jwtbackend.exceptions.StudentNotFoundException;
import me.sensoyyasin.jwtbackend.repositories.StudentRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class StudentServiceImpl implements StudentService {

    @Autowired //Dependency injection yani artık controllerda studentRepository'i kullanabilirim.
    private StudentRepository studentRepository;

    @Override //@Override annotation'ı bu metodun bir override olduğunu belirtir, yani bu metodun StudentService sınıfının üzerinde tanımlandığı ve bu metodun alt sınıflar veya implemente eden sınıflar tarafından özelleştirilebileceği anlamına gelir.
    public Student saveStudent(Student student) {
        return studentRepository.save(student); //save-> jpa repository
    }

    @Override
    public List<Student> getAllStudents() {
        return studentRepository.findAll(); //findAll -> jpa repository sagladi.
    }

    @Override
    public Student getStudentById(int id) {
        return studentRepository.findById(id)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with id " + id));
    }

    @Override
    public Student updateStudent(int id, Student student) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        if (optionalStudent.isPresent()) {
            Student updatedStudent = optionalStudent.get();

            updatedStudent.setName(student.getName());
            updatedStudent.setSurname(student.getSurname());
            updatedStudent.setNumber(student.getNumber());

            return studentRepository.save(updatedStudent);
        } else {
            throw new StudentNotFoundException("Student not found with id " + id);
        }
    }

    @Override
    public Student deleteStudent(int id) {
        Optional<Student> optionalStudent = studentRepository.findById(id);
        if (optionalStudent.isPresent()) {
            Student deletedStudent = optionalStudent.get();
            studentRepository.delete(deletedStudent);

            return deletedStudent;
        } else {
            throw new StudentNotFoundException("Student not found with id " + id);
        }
    }

    @Override
    public List<Student> getSearch(String search) {
        if (search == null || search.isEmpty()) {
            throw new StudentNotFoundException("Search is null or empty");
        } else {
            try {
                Long number = Long.parseLong(search);
                return studentRepository.findByNameOrSurnameOrNumber(null, number);
            } catch (NumberFormatException e) {
                return studentRepository.findByNameOrSurnameOrNumber(search, null);
            }
        }
    }
}