import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/AuthPage.css';
import AuthForm from '../components/AuthForm';

const AuthPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('access_token');
        if (token) {
            setIsAuthenticated(true);
        }
    }, []);

    const toggleForm = () => {
        setIsLogin(!isLogin);
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('http://localhost:8000/auth/jwt/login', {
                username: email,
                password: password
            }, {
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            });
            const { access_token } = response.data;
            localStorage.setItem('access_token', access_token);
            setIsAuthenticated(true);
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
    };

    const handleRegistration = async (event) => {
        event.preventDefault();
        if (password !== confirmPassword) return;
        try {
            const response = await axios.post('http://localhost:8000/auth/register', {
                email: email,
                password: password,
                number_of_tokens: 0,
                role_id: 0,
                username: ''
            }, {
                headers: { 'Content-Type': 'application/json' }
            });
            const { access_token } = response.data;
            localStorage.setItem('access_token', access_token);
            setIsAuthenticated(true);
            navigate('/home');
        } catch (error) {
            console.error(error);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('access_token');
        setIsAuthenticated(false);
        navigate('/login');
    };

    return (
        <div className="auth_wrapper">
            <div className="auth_decor1"></div>
            <div className="auth_decor2"></div>
            <div className="auth_decor3"></div>
            <div className="auth_container">
                {isAuthenticated ? (
                    <div>
                        <h2>Вы уже авторизованы</h2>
                        <button onClick={handleLogout} className="auth_button">Выйти из аккаунта</button>
                    </div>
                ) : (
                    <>
                        <h2>{isLogin ? "Войти" : "Зарегистрироваться"}</h2>
                        <AuthForm
                            isLogin={isLogin}
                            email={email}
                            password={password}
                            confirmPassword={confirmPassword}
                            onEmailChange={(e) => setEmail(e.target.value)}
                            onPasswordChange={(e) => setPassword(e.target.value)}
                            onConfirmPasswordChange={(e) => setConfirmPassword(e.target.value)}
                            onSubmit={isLogin ? handleLogin : handleRegistration}
                        />
                        <p>
                            {isLogin ? "Нет аккаунта?" : "Уже есть аккаунт?"}
                            <button type="button" className="toggle_button" onClick={toggleForm}>
                                {isLogin ? "Зарегистрироваться" : "Войти"}
                            </button>
                        </p>
                    </>
                )}
            </div>
        </div>
    );
};

export default AuthPage;
