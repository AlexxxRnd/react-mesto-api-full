import React from 'react';
import { NavLink, Routes, Route } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header({ onSignOut, userEmail }) {
    return (
        <header className="header">
            <img
                className="header__logo"
                src={logo}
                alt="логотип"
            />
            <Routes>
                <Route
                    path="/"
                    element={
                        <div className="header__user-email">
                            {userEmail}
                            <button
                                className="header__signout-btn"
                                onClick={onSignOut}>
                                Выйти
                            </button>
                        </div>
                    }
                />
                <Route
                    path="/sign-up"
                    element={
                        <NavLink to="/sign-in" className="header__login-btn">
                            Войти
                        </NavLink>
                    }
                />
                <Route
                    path="/sign-in"
                    element={
                        <NavLink to="/sign-up" className="header__login-btn">
                            Регистрация
                        </NavLink>
                    }
                />
            </Routes>
        </header>
    );
}

export default Header;