import React from 'react';
import './InfoTooltip.css';
import Popup from '../Popup/Popup';

function InfoTooltip({
  isOpen,
  onClose,
  onSwitchPopupClick,
  serverError,
  setServerError,
}) {
  function handleClose() {
    onClose();
    setTimeout(() => {
      setServerError('');
    }, 400);
  }

  const title = serverError ? 'Произошла ошибка!' : 'Пользователь успешно зарегистрирован!';
  return (
    <Popup
      isOpen={isOpen}
      title={title}
      serverError={serverError}
      popupSwitcher="Войти"
      onClose={handleClose}
      onSwitchPopupClick={onSwitchPopupClick}
      isInfoTooltip
    />
  );
}

export default InfoTooltip;
