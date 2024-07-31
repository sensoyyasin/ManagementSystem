// src/components/HeaderComponent.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

const HeaderComponent = () => {
  const navigate = useNavigate();
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const handleGoBack = () => {
    navigate('/student');
  };

  const handleLogout = () => {
    // Token ve diğer bilgileri temizle
    localStorage.removeItem('token');
    localStorage.removeItem('tokenExpiry');

    // Bilgilendirme mesajını ayarla
    setSnackbarMessage('Logging out ✅');
    setSnackbarSeverity('success');
    setOpenSnackbar(true);

    // 2 saniye bekle ve ardından login sayfasına yönlendir
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const handleCloseSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  };

  return (
    <div>
      <header>
        <nav className='navbar navbar-dark justify-content-center' style={{ backgroundColor: 'black' }}>
          <a className="navbar-brand" href="#">
            <h2 style={{ color: 'greenyellow', fontSize: '1.5rem' }}>
              Student Management System
            </h2>
          </a>
          <button onClick={handleGoBack} className="button-custom back-button">
            Back
          </button>
          <button onClick={handleLogout} className="button-custom logout-button">
            Log Out
          </button>
        </nav>
      </header>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
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

export default HeaderComponent;
