import React, { useState } from 'react';
import { Link } from "react-router-dom";

function Register({ onRegister }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSetEmail(event) {
    setEmail(event.target.value);
  }

  function handleSetPassword(event) {
    setPassword(event.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onRegister({ password, email })
  }

  return (
    <div className="auth">
      <h2 className="auth__title">
        Регистрация
      </h2>
      <form onSubmit={handleSubmit} className="auth__form">
        <input
          type="email"
          className="auth__input"
          id="email"
          name="email"
          placeholder="Email"
          required
          value={email}
          onChange={handleSetEmail}
        />
        <input
          type="password"
          className="auth__input"
          id="password"
          name="password"
          placeholder="Пароль"
          required
          value={password}
          onChange={handleSetPassword}
        />
        <button
          type="submit"
          className="auth__submit-button">
          Зарегистрироваться
        </button>
      </form>
      <div className="auth__signup">
        <h2 className="auth__question">Уже зарегистрированы? &nbsp;</h2>
        <Link
          to="/sign-in"
          className="auth__link">
          Войти
        </Link>
      </div>
    </div>
  );
}
export default Register;