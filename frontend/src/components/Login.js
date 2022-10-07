import React from 'react';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin, loggedIn }) {
    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault();
        onLogin({ email, password });
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
                <h2 className="account__title">Вход</h2>
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
                    Войти
                </button>
            </form>
        </main>
    );
};

export default Login;