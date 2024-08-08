import React, { useState, useEffect } from 'react';
import { createStudent, getStudent, updateStudent } from '../services/StudentService';
import { useNavigate, useParams } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const StudentComponent = () => {
  const [name, setFirstName] = useState('');
  const [surname, setLastName] = useState('');
  const [number, setNumber] = useState('');

  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (id) {
      getStudent(id)
        .then((response) => {
          setFirstName(response.data.name);
          setLastName(response.data.surname);
          setNumber(response.data.number);
        })
        .catch((error) => {
          console.error(error);
          setSnackbarMessage('Error fetching student details');
          setSnackbarSeverity('error');
          setOpenSnackbar(true);
        });
    }
  }, [id]);

  function ft_isalpha(props){
    if ((props >= 'a' && props <= 'z') || (props >= 'A' && props <= 'Z'))
        return (1);
      return(0);
  }

  function ft_controller() {
    if (!name || !surname || !number)
      return (-1);

    if (!ft_isalpha(name) || !ft_isalpha(surname) || number < 0 || number >= 2147483647)
      return (-1);

    return (0);
  }

  function saveOrUpdateStudent(e) {
    e.preventDefault();

    if (ft_controller() === -1) {
      setSnackbarMessage('Syntax Error, please check the strings');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    const student = { name, surname, number };

    const operation = id ? updateStudent(id, student) : createStudent(student);

    operation
      .then((response) => {
        console.log(response.data);
        setSnackbarMessage('Student saved successfully');
        setSnackbarSeverity('success');
        setOpenSnackbar(true);

        // Yönlendirmeyi 2.5 saniye sonra yap
        setTimeout(() => {
          navigate('/student');
        }, 2500);
      })
      .catch((error) => {
        console.error(error);
        setSnackbarMessage('There was an error processing your request');
        setSnackbarSeverity('error');
        setOpenSnackbar(true);
      });
  }

  function handleCloseSnackbar(event, reason) {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  }

  function pageTitle() {
    if (id)
      return <h2 className="text-center-new">Update Student</h2>;
    else
      return <h2 className="text-center-new">Add Student</h2>;
  }

  return (
    <div className="container-custom">
      <div className="form-wrapper">
        {pageTitle()}
        <form>
          <div className="form-group mb-2">
            <input
              type="text"
              placeholder="Student First Name"
              value={name}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-2">
            <input
              type="text"
              placeholder="Student Last Name"
              value={surname}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </div>

          <div className="form-group mb-2">
            <input
              type="text"
              placeholder="Student Number"
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
          </div>

          <button className="btn-custom" onClick={saveOrUpdateStudent}>
            Submit ✅
          </button>
        </form>
      </div>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2500}
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

export default StudentComponent;
