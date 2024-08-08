import axios from "axios";

const REST_API_BASE_URL = 'http://localhost:8080/student';
const REST_API_BASE_COURSE_URL = 'http://localhost:8080/course';

// Token'ı al
const getToken = () => localStorage.getItem('token');

// İsteklerin başlıklarına token'ı ekle
const getHeaders = () => ({
  headers: {
    'Authorization': `Bearer ${getToken()}`
  }
});

// Tüm öğrencileri listeleme veya arama
export const listStudents = (searchText) => {
    const headers = getHeaders();
    if (searchText && searchText.trim() !== '') {
        return axios.get(`${REST_API_BASE_URL}/search/${searchText}`, headers);
    } else {
        return axios.get(REST_API_BASE_URL, headers);
    }
}

// Yeni öğrenci ekleme - HTTP Post
export const createStudent = (student) => {
    const headers = getHeaders();
    return axios.post(`${REST_API_BASE_URL}/add`, student, headers);
}

// Belirli bir öğrenciyi getirme - HTTP Get
export const getStudent = (studentId) => {
    const headers = getHeaders();
    return axios.get(`${REST_API_BASE_URL}/${studentId}`, headers);
}

// Belirli bir öğrenciyi güncelleme - Http Put
export const updateStudent = (studentId, student) => {
    const headers = getHeaders();
    return axios.put(`${REST_API_BASE_URL}/${studentId}`, student, headers);
}

// Belirli bir öğrenciyi silme - Http Delete
export const deleteStudent = (studentId) => {
    const headers = getHeaders();
    return axios.delete(`${REST_API_BASE_URL}/${studentId}`, headers);
}

// Belirli bir öğrencinin derslerini getirme - Http Get
export const getStudentCourse = (studentId) => {
    const headers = getHeaders();
    return axios.get(`${REST_API_BASE_COURSE_URL}/${studentId}`, headers);
}

// Enum Yapısından, geri kalan kursları alabilmek icin. - Http Get
export const getUnselectedStudentCourses = (studentId) => {
    const headers = getHeaders();
    return axios.get(`${REST_API_BASE_COURSE_URL}/unselected/${studentId}`, headers);
}

// Kullanıcıya kurs ekleme
export const addCourse = (studentId, course) => {
    const headers = getHeaders();
    return axios.post(`${REST_API_BASE_COURSE_URL}/add/${studentId}`, course, headers);
}

// Kurs Silme
export const deleteCourse = (studentId, courseType) => {
    const headers = getHeaders();
    return axios.delete(`${REST_API_BASE_COURSE_URL}/delete/${studentId}/${courseType}`, headers);
}
