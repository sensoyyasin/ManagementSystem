import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../App.css';

const REST_API_BASE_URL = 'http://localhost:8080/auth/signup'; // Signup API URL

const Signup = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (password !== confirmPassword) {
            setErrorMessage('Şifreler eşleşmiyor.');
            setOpenSnackbar(true);
            return;
        }

        try {
            await axios.post(REST_API_BASE_URL, { email, password, fullName });

            // Successful registration redirection
            navigate('/login'); // redirecton to the login page
        } catch (error) {
            setErrorMessage('Kayıt başarısız. Lütfen bilgilerinizi kontrol edin.');
            setOpenSnackbar(true);

            setTimeout(() => {
                setOpenSnackbar(false);
            }, 2500);
        }
    };

    const handleCloseSnackbar = () => {
        setOpenSnackbar(false);
    };

    const handleBack = () => {
        navigate('/login');
    };

    return (
        <div className="custom-body">
            <div className="custom-login-container">
                <div className="custom-login-form">
                    <div className="custom-form-wrapper">
                        <h1 className="custom-login-title">Sign Up</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="text"
                                placeholder="Full Name"
                                required
                                value={fullName}
                                onChange={(e) => setFullName(e.target.value)}
                                className="custom-text-field"
                            />
                            <input
                                type="email"
                                placeholder="E-mail"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="custom-text-field"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="custom-text-field"
                            />
                            <input
                                type="password"
                                placeholder="Confirm Password"
                                required
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="custom-text-field"
                            />
                            <button
                                type="submit"
                                className="custom-login-button"
                            >
                                👤 Sign Up
                            </button>
                            <button
                                type="button"
                                className="custom-back-button"
                                onClick={handleBack}
                            >
                                Back
                            </button>
                        </form>
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
                    sx={{ width: '100%', color: 'white' }}
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default Signup;
