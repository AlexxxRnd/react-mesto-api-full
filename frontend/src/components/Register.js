import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';

function Register({ onRegister, loggedIn }) {
    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        onRegister({ email, password });
    }
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    function handleChangeEmail(e) {
        setEmail(e.target.value);
    }
    function handleChangePassword(e) {
        setPassword(e.target.value);
    }
    if (loggedIn) {
        navigate('/');
    }
    return (
        <main className="content">
            <form className="account__form" onSubmit={handleSubmit}>
                <h2 className="account__title">Регистрация</h2>
                <input
                    className="account__input"
                    name="email"
                    type="email"
                    placeholder="Email"
                    required=""
                    value={email || ""}
                    onChange={handleChangeEmail}
                />
                <input
                    className="account__input"
                    name="password"
                    type="password"
                    placeholder="Пароль"
                    required=""
                    value={password || ""}
                    onChange={handleChangePassword}
                />
                <button
                    className="account__submit-btn"
                    type="submit"
                >
                    Зарегистрироваться
                </button>
                <NavLink to="/sign-in" className="account__subtitle">Уже зарегистрированы? Войти</NavLink>
            </form>
        </main>
    );
};

export default Register; 