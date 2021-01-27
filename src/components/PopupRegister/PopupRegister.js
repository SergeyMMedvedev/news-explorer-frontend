import React from 'react';
import './PopupRegister.css';
import Popup from '../Popup/Popup';

function PopupRegister({ isOpen, onClose, onSwitchPopupClick }) {
  return (
    <Popup
      popupWithForm
      isOpen={isOpen}
      title="Регистрация"
      popupSwitcher="Войти"
      onClose={onClose}
      onSwitchPopupClick={onSwitchPopupClick}
    >
      <label htmlFor="register-email" className="popup__label">
        Email
        <input
          id="register-email"
          type="text"
          className="popup__input"
          placeholder="Введите почту"
          name="email"
        />
      </label>
      <label htmlFor="register-password" className="popup__label">
        Пароль
        <input
          id="register-password"
          type="text"
          className="popup__input"
          placeholder="Введите пароль"
          name="password"
        />
      </label>
      <label htmlFor="register-name" className="popup__label">
        Имя
        <input
          id="register-name"
          type="text"
          className="popup__input"
          placeholder="Введите свое имя"
          name="name"
        />
      </label>
    </Popup>
  );
}

export default PopupRegister;
