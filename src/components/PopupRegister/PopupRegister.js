import React, { useState, useEffect } from 'react';
import './PopupRegister.css';
import '../appearAnimation/appearAnimation.css';
import Popup from '../Popup/Popup';

function PopupRegister({
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
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

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

  function handleNameChange(e) {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
    setServerError('');
  }

  function handleSubmit(disabled) {
    setInputDisabled(disabled);
    onSubmit(email, password, name, () => {
      setEmail('');
      setPassword('');
      setName('');
      setServerError('');
    });
  }

  function handleClose() {
    onClose();
    setTimeout(() => {
      setEmail('');
      setEmailError('');
      setPassword('');
      setPasswordError('');
      setName('');
      setNameError('');
      setServerError('');
    }, 300);
  }

  useEffect(() => {
    setInputDisabled(false);
  }, [isOpen, serverError]);

  return (
    <Popup
      popupWithForm
      isOpen={isOpen}
      title="Регистрация"
      popupSwitcher=" Войти"
      onClose={handleClose}
      onSwitchPopupClick={onSwitchPopupClick}
      onSubmit={handleSubmit}
      submitText="Зарегистрироваться"
      submitButtonDisabled={Boolean(serverError || emailError || passwordError || nameError || (!email || !password || !name))}
      serverError={serverError}
    >
      <label htmlFor="register-email" className="popup__label">
        Email
        <input
          id="register-email"
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
        id="register-email-error"
        className={
          `popup__input-error  
          ${isOpen ? 'popup__input-error_active' : ''}
          ${emailError ? 'appearAnimation' : ''}`
        }
      >
        {emailError}
      </span>
      <label htmlFor="register-password" className="popup__label">
        Пароль
        <input
          id="register-password"
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
        id="register-password-error"
        className={
          `popup__input-error  
          ${isOpen ? 'popup__input-error_active' : ''}
          ${passwordError ? 'appearAnimation' : ''}`
        }
      >
        {passwordError}
      </span>
      <label htmlFor="register-name" className="popup__label">
        Имя
        <input
          id="register-name"
          type="text"
          value={name}
          className="popup__input"
          placeholder="Введите свое имя"
          name="name"
          onChange={handleNameChange}
          minLength="2"
          maxLength="30"
          required
          disabled={inputDisabled}
        />
      </label>
      <span
        id="register-name-error"
        className={
          `popup__input-error  
          ${isOpen ? 'popup__input-error_active' : ''}
          ${nameError ? 'appearAnimation' : ''}`
          }
      >
        {nameError}
      </span>
    </Popup>
  );
}

export default PopupRegister;
