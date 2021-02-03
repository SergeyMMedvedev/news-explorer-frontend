import React, { useState } from 'react';
import './PopupLogin.css';
import Popup from '../Popup/Popup';

function PopupLogin({
  isOpen,
  onClose,
  onSwitchPopupClick,
  onSubmit,
}) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setEmailError(e.target.validationMessage);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setPasswordError(e.target.validationMessage);
  }

  function handleSubmit() {
    onSubmit(email, password);
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setEmail('');
      setEmailError('');
      setPassword('');
      setPasswordError('');
    }, 400);
  }

  return (
    <Popup
      popupWithForm
      isOpen={isOpen}
      title="Вход"
      popupSwitcher=" Зарегистрироваться"
      onClose={handleClose}
      onSwitchPopupClick={onSwitchPopupClick}
      onSubmit={handleSubmit}
      submitText="Войти"
      submitButtonDisabled={emailError || passwordError || (!email || !password)}
    >
      <label htmlFor="login-email" className="popup__label">
        Email
        <input
          id="login-email"
          type="email"
          value={email}
          className="popup__input"
          placeholder="Введите почту"
          name="email"
          onChange={handleEmailChange}
          maxLength="30"
          required
        />
      </label>
      <span id="login-email-error" className={`popup__input-error ${isOpen && 'popup__input-error_active'}`}>{emailError}</span>
      <label htmlFor="login-password" className="popup__label">
        Пароль
        <input
          id="login-password"
          type="password"
          value={password}
          className="popup__input"
          placeholder="Введите пароль"
          name="password"
          onChange={handlePasswordChange}
          minLength="8"
          required
        />
      </label>
      <span id="login-password-error" className={`popup__input-error ${isOpen && 'popup__input-error_active'}`}>{passwordError}</span>
    </Popup>
  );
}

export default PopupLogin;
