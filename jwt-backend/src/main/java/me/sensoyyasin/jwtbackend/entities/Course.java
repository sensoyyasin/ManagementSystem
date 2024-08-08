package me.sensoyyasin.jwtbackend.entities;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "courses")
public class Course {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;

    @Column(name = "courseName")
    private String courseName;

    @Enumerated(EnumType.STRING)
    @Column(name = "courseType")
    private CourseType courseType;

    @ManyToMany(mappedBy = "courses", fetch = FetchType.LAZY)
    @JsonIgnore
    private List<Student> students = new ArrayList<>();

    public String getCourseName() {
        return courseName;
    }

    public void setCourseName(String courseName) {
        this.courseName = courseName;
    }

    public CourseType getCourseType() {
        return courseType;
    }

    public void setCourseType(CourseType courseType) {
        this.courseType = courseType;
    }

    public List<Student> getStudents() {
        return students;
    }

    public void setStudents(List<Student> students) {
        this.students = students;
    }
}