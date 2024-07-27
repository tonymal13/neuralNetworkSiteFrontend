import React from 'react';
import InputField from './InputField';

const AuthForm = ({ isLogin, email, password, confirmPassword, onEmailChange, onPasswordChange, onConfirmPasswordChange, onSubmit }) => (
    <form onSubmit={onSubmit}>
        <InputField
            id={isLogin ? "login_email" : "register-email"}
            label="Адрес электронной почты"
            type="text"
            value={email}
            onChange={onEmailChange}
            required
        />
        <InputField
            id={isLogin ? "login_password" : "register-password"}
            label="Пароль"
            type="password"
            value={password}
            onChange={onPasswordChange}
            required
        />
        {!isLogin && (
            <InputField
                id="register-confirm-password"
                label="Подтвердите пароль"
                type="password"
                value={confirmPassword}
                onChange={onConfirmPasswordChange}
                required
            />
        )}
        <button type="submit" className="auth_button">
            {isLogin ? "Войти" : "Создать аккаунт"}
        </button>
    </form>
);

export default AuthForm;