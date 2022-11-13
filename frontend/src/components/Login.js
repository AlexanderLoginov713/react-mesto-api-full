import React, { useState } from 'react';

function Login({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleSetEmail(event) {
    setEmail(event.target.value);
  }

  function handleSetPassword(event) {
    setPassword(event.target.value);
  }
  function clearForm() {
    setEmail('');
    setPassword('');
  }

  function handleSubmit(e) {
    e.preventDefault();
    onLogin({ password, email })
      .then(() => clearForm());
  }

  return (
    <div className="auth">
      <h2 className="auth__title">Вход</h2>
      <form onSubmit={handleSubmit}
        className="auth__form">
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
          Войти
        </button>
      </form>
    </div>
  );
}
export default Login;