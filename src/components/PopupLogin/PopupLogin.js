import React, { useState } from 'react';
import './PopupLogin.css';
import Popup from '../Popup/Popup';

function PopupLogin({
  isOpen,
  onClose,
  onSwitchPopupClick,
  onUpdateUser,
}) {
  const [email, setEmail] = useState();
  // const [emailError, setEmailError] = useState();

  function handleChangeEmail(e) {
    setEmail(e.target.value);
  }

  function handleSubmit() {
    onUpdateUser({
      email,
      name: 'Сергей',
    });
    onClose();
  }

  return (
    <Popup
      popupWithForm
      isOpen={isOpen}
      title="Вход"
      popupSwitcher="Зарегистрироваться"
      onClose={onClose}
      onSwitchPopupClick={onSwitchPopupClick}
      onSubmit={handleSubmit}
    >
      <label htmlFor="login-email" className="popup__label">
        Email
        <input
          id="login-email"
          type="text"
          className="popup__input"
          placeholder="Введите почту"
          name="email"
          onChange={handleChangeEmail}
        />
      </label>
      <label htmlFor="login-password" className="popup__label">
        Пароль
        <input
          id="login-password"
          type="text"
          className="popup__input"
          placeholder="Введите пароль"
          name="password"
        />
      </label>
    </Popup>
  );
}

export default PopupLogin;
