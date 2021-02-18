import React, { useState, useEffect } from 'react';
import './PopupLogin.css';
import '../appearAnimation/appearAnimation.css';
import Popup from '../Popup/Popup';

function PopupLogin({
  isOpen,
  onClose,
  onSwitchPopupClick,
  onSubmit,
  serverError,
  setServerError,
}) {
  const [inputDisabled, setInputDisabled] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setEmailError(e.target.validationMessage);
    setServerError('');
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setPasswordError(e.target.validationMessage);
    setServerError('');
  }

  function handleSubmit(disabled) {
    setInputDisabled(disabled);
    onSubmit(email, password);
    setServerError('');
  }

  function handleClose() {
    onClose();
    setServerError('');
    setTimeout(() => {
      setEmail('');
      setEmailError('');
      setPassword('');
      setPasswordError('');
      setServerError('');
    }, 300);
  }

  useEffect(() => {
    const currentEmail = localStorage.getItem('email');
    const currentPassword = localStorage.getItem('password');
    if (isOpen && currentEmail && currentPassword) {
      setEmail(currentEmail);
      setPassword(currentPassword);
    }
  }, [isOpen]);

  useEffect(() => {
    setInputDisabled(false);
  }, [isOpen, serverError]);

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
      submitButtonDisabled={Boolean(serverError || emailError || passwordError || (!email || !password))}
      serverError={serverError}
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
          disabled={inputDisabled}
        />
      </label>
      <span
        id="login-email-error"
        className={
          `popup__input-error 
          ${isOpen ? 'popup__input-error_active' : ''} 
          ${emailError ? 'appearAnimation' : ''}`
        }
      >
        {emailError}
      </span>
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
          autoComplete="on"
          required
          disabled={inputDisabled}
        />
      </label>
      <span
        id="login-password-error"
        className={
          `popup__input-error  
          ${isOpen ? 'popup__input-error_active' : ''}
          ${passwordError ? 'appearAnimation' : ''}`
        }
      >
        {passwordError}
      </span>
    </Popup>
  );
}

export default PopupLogin;
