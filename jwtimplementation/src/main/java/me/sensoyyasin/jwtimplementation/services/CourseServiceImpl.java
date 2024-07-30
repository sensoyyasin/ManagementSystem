package me.sensoyyasin.jwtimplementation.services;

import me.sensoyyasin.jwtimplementation.entities.Course;
import me.sensoyyasin.jwtimplementation.entities.CourseType;
import me.sensoyyasin.jwtimplementation.entities.Student;
import me.sensoyyasin.jwtimplementation.exceptions.CourseAlreadyExistsException;
import me.sensoyyasin.jwtimplementation.exceptions.StudentNotFoundException;
import me.sensoyyasin.jwtimplementation.repositories.CourseRepository;
import me.sensoyyasin.jwtimplementation.repositories.StudentRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CourseServiceImpl implements CourseService {

    private final CourseRepository courseRepository;
    private final StudentRepository studentRepository;

    public CourseServiceImpl(CourseRepository courseRepository, StudentRepository studentRepository) {
        this.courseRepository = courseRepository;
        this.studentRepository = studentRepository;
    }

    @Override
    public List<Course> getAllCourses() {
        return courseRepository.findAll();
    }

    @Override
    public List<Course> getCourseById(int studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with id: " + studentId));

        return student.getCourses();
    }

    @Override
    public Student addCoursesToStudent(int studentId, Course course) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with id " + studentId));

        // Eğer öğrencinin ders listesi (courses) null ise veya boşsa, yeni bir ArrayList ile oluşturabilirsiniz.
        if (student.getCourses() == null)
            student.setCourses(new ArrayList<>());

        if (course.getCourseType() == null || course.getCourseName() == null)
            throw new IllegalArgumentException("Course type or name cannot be null");

        if (isCourseAlreadyRegistered(student, course))
            throw new CourseAlreadyExistsException("Course already exists");

        student.getCourses().add(course);
        return studentRepository.save(student); //Ogrenciyi kaydetme
    }

    @Override
    public Student updateCourseForStudent(int studentId, Course newCourseName) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with id " + studentId));

        List<Course> courses = student.getCourses();
        for (Course course : courses) {
            if (course.getCourseType() == newCourseName.getCourseType()){
                course.setCourseName(newCourseName.getCourseName());
                break;
            }
        }

        student.setCourses(courses);
        return studentRepository.save(student);
    }

    @Override
    public Student deleteCourseForStudent(int studentId, String courseType) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with id " + studentId));

        List<Course> courses = student.getCourses(); //ogrenci dersleri alinir.
        Iterator<Course> iterator = courses.iterator();
        while (iterator.hasNext()) {
            Course course = iterator.next();
            if (course.getCourseType() == CourseType.valueOf(courseType)){
                iterator.remove();
                break;
            }
        }
        return studentRepository.save(student);
    }

    @Override
    public List<CourseType> getUnSelectedCourses(int studentId) {
        Student student = studentRepository.findById(studentId)
                .orElseThrow(() -> new StudentNotFoundException("Student not found with id " + studentId));

        // Öğrencinin aldığı dersleri al
        List<Course> studentCourses = student.getCourses(); // Öğrenciye atanmış dersler

        // Öğrencinin aldığı derslerin türlerini al
        Set<CourseType> studentCourseTypes = new HashSet<>();
        for (Course course : studentCourses)
            studentCourseTypes.add(course.getCourseType());

        // Enum'daki tüm ders türlerini al
        Set<CourseType> allCourseTypes = EnumSet.allOf(CourseType.class);

        // Enum'daki tüm ders türlerinden, öğrencinin aldığı derslerde olmayanları bul
        List<CourseType> unselectedCourseTypes = new ArrayList<>();
        for (CourseType type : allCourseTypes) {
            if (!studentCourseTypes.contains(type))
                unselectedCourseTypes.add(type);
        }
        return unselectedCourseTypes;
    }

    private boolean isCourseAlreadyRegistered(Student student, Course course) {
        List<Course> courses = student.getCourses();
        CourseType newCourseType = course.getCourseType();
        for (Course courseCheck : courses) {
            if (courseCheck.getCourseType().equals(newCourseType)) {
                return true;
            }
        }
        return false;
    }

}