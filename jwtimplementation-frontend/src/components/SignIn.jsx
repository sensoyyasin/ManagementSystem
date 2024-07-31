import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';
import '../App.css'; // CSS dosyasını import et

const REST_API_BASE_URL = 'http://localhost:8080/auth/login'; // Giriş API URL'si

const SignIn = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post(REST_API_BASE_URL, { email, password });

            // Token ve süresini alma
            const { token, expiresIn } = response.data;

            // Token'ı localStorage'a saklama
            localStorage.setItem('token', token);

            // Token süresini saklamak için ek bir işlem yapılabilir (isteğe bağlı)
            localStorage.setItem('tokenExpiry', (Date.now() + expiresIn).toString());

            // Başarılı giriş sonrası yönlendirme
            navigate('/student');
        } catch (error) {
            setErrorMessage('Giriş başarısız. Lütfen bilgilerinizi kontrol edin.');
            setOpenSnackbar(true);

            // 2.5 saniye sonra snackbar'ı kapat
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
                        <h1 className="custom-login-title">Sign In</h1>
                        <form onSubmit={handleSubmit}>
                            <input
                                type="email"
                                placeholder="E-Mail"
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
                            <button
                                type="submit"
                                className="custom-login-button"
                            >
                                <span className="button-icon">🚀</span>
                                Sign in
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
                    sx={{ width: '100%', color: 'white' }} // Yazı rengini beyaz yap
                >
                    {errorMessage}
                </Alert>
            </Snackbar>
        </div>
    );
};

export default SignIn;
