import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/student';
const REST_API_BASE_COURSE_URL = 'http://localhost:8080/course';

const getToken = () => localStorage.getItem('token');

// Add Tokens to header
const getHeaders = () => ({
  headers: {
    'Authorization': `Bearer ${getToken()}`
  }
});

// Find or list all students
export const listStudents = (searchText) => {
    const headers = getHeaders();
    if (searchText && searchText.trim() !== '') {
        return axios.get(`${REST_API_BASE_URL}/search/${searchText}`, headers);
    } else {
        return axios.get(REST_API_BASE_URL, headers);
    }
}

// Add new Student - HTTP Post
export const createStudent = (student) => {
    const headers = getHeaders();
    return axios.post(`${REST_API_BASE_URL}/add`, student, headers);
}

// Get spesific student - HTTP Get
export const getStudent = (studentId) => {
    const headers = getHeaders();
    return axios.get(`${REST_API_BASE_URL}/${studentId}`, headers);
}

// Update spesific student - Http Put
export const updateStudent = (studentId, student) => {
    const headers = getHeaders();
    return axios.put(`${REST_API_BASE_URL}/${studentId}`, student, headers);
}

// Delete spesific student - Http Delete
export const deleteStudent = (studentId) => {
    const headers = getHeaders();
    return axios.delete(`${REST_API_BASE_URL}/${studentId}`, headers);
}

// Get spesific student's lectures - Http Get
export const getStudentCourse = (studentId) => {
    const headers = getHeaders();
    return axios.get(`${REST_API_BASE_COURSE_URL}/${studentId}`, headers);
}

export const getUnselectedStudentCourses = (studentId) => {
    const headers = getHeaders();
    return axios.get(`${REST_API_BASE_COURSE_URL}/unselected/${studentId}`, headers);
}

// Add course to users
export const addCourse = (studentId, course) => {
    const headers = getHeaders();
    return axios.post(`${REST_API_BASE_COURSE_URL}/add/${studentId}`, course, headers);
}

// Delete course
export const deleteCourse = (studentId, courseType) => {
    const headers = getHeaders();
    return axios.delete(`${REST_API_BASE_COURSE_URL}/delete/${studentId}/${courseType}`, headers);
}
