import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../App.css'; // CSS dosyasını import et

const Login = () => {
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const signupFunction = () => {
        navigate('/signup');
    };

    const signinFunction = () => {
        navigate('/signin');
    };

    return (
        <div className="custom-body">
            <div className="custom-login-container">
                <div className="custom-login-form">
                    <div className="custom-form-wrapper">
                        <h1 className="custom-login-title">Login</h1>
                        <div className="button-container">
                            <button
                                onClick={signinFunction}
                                className="custom-login-button"
                            >
                                <span className="button-icon">🚀</span>
                                Sign In
                            </button>
                            <button
                                onClick={signupFunction}
                                className="custom-login-button"
                            >
                                <span className="button-icon">🌟</span>
                                Sign Up
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={2500}
                onClose={handleCloseSnackbar}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            >
                <Alert
                    onClose={handleCloseSnackbar}
                    severity="error"
                    sx={{ width: '100%', color: 'white' }} // Yazı rengini beyaz yap
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Login;
