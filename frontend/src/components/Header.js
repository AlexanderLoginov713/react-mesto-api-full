import React from "react";
import { Link, useLocation } from 'react-router-dom';

function Header({ logo, userData, loggedIn, signOut }) {
  const location = useLocation();

  return (
    <header className="header">
      <img
        src={logo}
        alt="Логотип"
        className="header__logo" />
      <div className="header__section">
        {loggedIn && <h2 className="header__email">{userData.email}</h2>}
        {loggedIn && <button onClick={signOut} className="header__register-button">Выйти</button>}
        {location.pathname === '/signup' &&
          <Link
            to="signin"
            className="header__register-button">
            Войти
          </Link>
          }
        {location.pathname === '/signin' &&
          <Link
            to="signup"
            className="header__register-button">
            Зарегистрироваться
          </Link>
          }
      </div>
    </header>
  );
}

export default Header;