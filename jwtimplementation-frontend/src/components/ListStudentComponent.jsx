import React, { useEffect, useState } from 'react';
import { deleteStudent, listStudents } from '../services/StudentService';
import { useNavigate, Link } from 'react-router-dom';
import '../App.css';
import { Avatar } from '@mui/material';

const ListStudentsComponent = () => {
  const [students, setStudents] = useState([]);
  const [searchText, setSearchText] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    getAllStudents();
  }, []);

  function getAllStudents() {
    listStudents()
      .then((response) => {
        setStudents(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function addNewStudent() {
    navigate('/student/add');
  }

  function updateStudent(id) {
    navigate(`/student/edit/${id}`);
  }

  function removeStudent(id) {
    deleteStudent(id)
      .then(() => {
        getAllStudents(); // Öğrencileri yeniden getirmek önemlidir
      })
      .catch((error) => {
        console.error(error);
      });
  }

  function handleSearch() {
    if (searchText.trim() === '') {
      getAllStudents();
    } else {
      listStudents(searchText)
        .then((response) => {
          setStudents(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  return (
    <div className="container">
      <button className="btn-custom" onClick={addNewStudent}>
        Add Student ➕
      </button>
      <div className='search-container'>
        <input
        type='text'
        className='search-input'
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        placeholder="Search by Name or Number"
        />
        <button className="search-button" onClick={handleSearch}>
          Search 🔍
        </button>
      </div>
      <h3 className="text-center">List of Students</h3>
      <div className="table-container">
        <table className="table-custom">
          <thead>
            <tr>
              <th>Student Id</th>
              <th>Student Name</th>
              <th>Student Surname</th>
              <th>Student Number</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {students.map((student) => (
              <tr key={student.id}>
                <td>{student.id}</td>
                <td>
                  <Link to={`/student/${student.id}`} key = {student.id} className="student-link" style={{ textDecoration: 'none', color: 'inherit', display: 'flex', alignItems: 'center' }}>
                    <Avatar className="avatar">{student.name.charAt(0).toUpperCase()}</Avatar>
                    <span style={{ marginLeft: '5px' }}>{student.name}</span>
                  </Link>
                </td>
                <td>{student.surname}</td>
                <td>{student.number}</td>
                <td>
                  <button
                    className="btn-custom update-button"
                    onClick={() => updateStudent(student.id)}
                    style={{ marginRight: '5px' }}
                  >
                    Update 🛠️
                  </button>
                  <button className="btn-custom delete-button" onClick={() => removeStudent(student.id)}>
                    Delete 🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListStudentsComponent;
