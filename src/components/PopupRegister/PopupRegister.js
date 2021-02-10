import React, { useState } from 'react';
import './PopupRegister.css';
import Popup from '../Popup/Popup';

function PopupRegister({
  isOpen,
  onClose,
  onSwitchPopupClick,
  onSubmit,
}) {
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState('');
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [name, setName] = useState('');
  const [nameError, setNameError] = useState('');

  function handleEmailChange(e) {
    setEmail(e.target.value);
    setEmailError(e.target.validationMessage);
  }

  function handlePasswordChange(e) {
    setPassword(e.target.value);
    setPasswordError(e.target.validationMessage);
  }

  function handleNameChange(e) {
    setName(e.target.value);
    setNameError(e.target.validationMessage);
  }

  function handleSubmit() {
    onSubmit(email, password, name, () => {
      setEmail('');
      setPassword('');
      setName('');
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
    }, 400);
  }

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
      submitButtonDisabled={
        emailError || passwordError || nameError || (!email || !password || !name)
      }
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
        />
      </label>
      <span id="register-email-error" className={`popup__input-error ${isOpen && 'popup__input-error_active'}`}>{emailError}</span>
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
          required
        />
      </label>
      <span id="register-password-error" className={`popup__input-error ${isOpen && 'popup__input-error_active'}`}>{passwordError}</span>
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
        />
      </label>
      <span id="register-name-error" className={`popup__input-error ${isOpen && 'popup__input-error_active'}`}>{nameError}</span>
    </Popup>
  );
}

export default PopupRegister;
