import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getUnselectedStudentCourses, getStudent, getStudentCourse, addCourse, deleteCourse } from '../services/StudentService';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const CourseTypeMap = new Map([
  ['BIOLOGY', 'Biology'],
  ['CHEMISTRY', 'Chemistry'],
  ['ELECTRONICS', 'Electronics'],
  ['LITERATURE', 'Literature'],
  ['MUSIC', 'Music'],
  ['MATHEMATICS', 'Mathematics'],
  ['PHYSICS', 'Physics'],
  ['HISTORY', 'History'],
  ['ART', 'Art'],
  ['COMPUTER_SCIENCE', 'Computer Science']
]);

const StudentDetailComponent = () => {
  const { id } = useParams();
  const [student, setStudent] = useState(null);
  const [courses, setCourses] = useState([]);
  const [unselectedCourseTypes, setUnselectedCourseTypes] = useState([]);
  const [selectedCourses, setSelectedCourses] = useState(new Set());
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  useEffect(() => {
    Promise.all([
        getStudent(id),
        getStudentCourse(id),
        getUnselectedStudentCourses(id)
    ])
    .then(([studentResponse, coursesResponse, unselectedCoursesResponse]) => {
        setStudent(studentResponse.data);
        setCourses(Array.isArray(coursesResponse.data) ? coursesResponse.data : []);
        setUnselectedCourseTypes(Array.isArray(unselectedCoursesResponse.data) ? unselectedCoursesResponse.data : []);
    })
    .catch(error => {
        console.error('Error fetching student and courses', error);
    });
  }, [id]);

  const handleCourseSelection = (courseType) => {
    setSelectedCourses(prevSelectedCourses => {
      const newSelectedCourses = new Set(prevSelectedCourses);
      if (newSelectedCourses.has(courseType)) {
        newSelectedCourses.delete(courseType);
      } else {
        newSelectedCourses.add(courseType);
      }
      return newSelectedCourses;
    });
  };

  const handleAddCourses = () => {
    if (selectedCourses.size === 0) {
      setSnackbarMessage('No courses selected');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return;
    }

    if (selectedCourses.size > 1) {
      setSnackbarMessage('Please Select only 1 course at the same time');
      setSnackbarSeverity('warning');
      setOpenSnackbar(true);
      return;
    }

    const addCoursesPromises = Array.from(selectedCourses).map(courseType => {
        const courseName = CourseTypeMap.get(courseType) + ' 101';
        const course = { courseName, courseType };

        return addCourse(id, course).then(response => {
            setUnselectedCourseTypes(prevUnselectedCourseTypes =>
                prevUnselectedCourseTypes.filter(c => c !== courseType)
            );
        });
    });

    Promise.all(addCoursesPromises)
      .then(() => {
        setSnackbarMessage('Courses added successfully');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);

        setTimeout(() => {
          window.location.reload();
        }, 1500);
      })
      .catch(error => {
        setSnackbarMessage('Error adding courses');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  };

  const handleDeleteCourse = (courseType) => {
    deleteCourse(id, courseType)
      .then(response => {
        setCourses(prevCourses => prevCourses.filter(course => course.courseType !== courseType));
        setUnselectedCourseTypes(prevUnselectedCourseTypes => [...prevUnselectedCourseTypes, courseType]);
        setSnackbarMessage('Course deleted successfully');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);
      })
      .catch(error => {
        setSnackbarMessage('Error deleting course');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-custom">
      <div className="details-wrapper">
        <h2 className="text-center-new">Student Details 📌</h2>
        <div className="student-details">
            <p><span className="label">Student ID:</span> <span className="value">{id}</span></p>
            <p><span className="label">Student Name:</span> <span className="value">{student.name}</span></p>
            <p><span className="label">Student Surname:</span> <span className="value">{student.surname}</span></p>
            <p><span className="label">Student Number:</span> <span className="value">{student.number}</span></p>
          <h4 className="courses-title">Courses 📚</h4>
          <ul className="courses-list">
            {courses.map((course, index) => (
              <li key={index} className="course-item">
                <strong>{CourseTypeMap.get(course.courseType)}</strong> - {course.courseName}
                <p></p>
                <button className="btn-custom delete-button custom-delete-button" onClick={() => handleDeleteCourse(course.courseType)}>Delete</button>
                <p className="course-description">{course.courseDescription}</p>
              </li>
            ))}
          </ul>
        </div>

        <div className='unselected-courses'>
          <h2 className="text-center-courses">Unselected Courses</h2>
          <ul className="courses-list">
            {unselectedCourseTypes.map((courseType, index) => (
              <li key={index} className="unselected-course-item">
                <input
                  type="checkbox"
                  onChange={() => handleCourseSelection(courseType)}
                />
                <strong>{CourseTypeMap.get(courseType)}</strong>
              </li>
            ))}
          </ul>
          <button onClick={handleAddCourses} className="btn-custom btn-custom-course">Add Selected Courses ➕</button>
        </div>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={1500}
        onClose={handleCloseSnackbar}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarSeverity}
          variant="filled"
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default StudentDetailComponent;
